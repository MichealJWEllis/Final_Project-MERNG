const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { KEY } = require("../config/config")
const { UserInputError } = require('apollo-server-express')
const { validationReg, validateLogin } = require('../utils/auth')
const checkAuth = require('../utils/check-auth')



function genToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, KEY, { expiresIn: '1hr' });
}

const resolvers = {
    Post: {
        likeCount(parent) {
            return parent.likes.length
        },
        commentCount(parent) {
            return parent.comments.length
        }
    },
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (e) {
                throw new Error(e);
            }
        },
        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId)
                if (post) {
                    return post;

                } else {
                    throw new Error('Post not found')
                }
            } catch (e) {
                throw new Error(e)
            }
        }
    },
    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLogin(username, password)
            if (!valid) {
                throw new UserInputError("Errors", { errors })
            }

            const user = await User.findOne({ username })
            if (!user) {
                errors.gen = 'User not found';
                throw new UserInputError("User not found", { errors })
            }
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                errors.gen = 'User not found';
                throw new UserInputError("Wrong password", { errors })
            }
            const token = genToken(user)
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },

        async register(_,
            { registerInput: { username, email, password, confirmPassword } }) {
            const { valid, errors } = validationReg(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }
            const user = await User.findOne({
                username
            })
            if (user) {
                throw new UserInputError('Username already taken!', {
                    errors: {
                        username: 'This username is taken!'
                    }

                })
            }
            password = await bcrypt.hash(password, 10);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date()
            })

            const res = await newUser.save();
            const token = genToken(res)

            return {
                ...res._doc,
                id: res._id,
                token
            }
        },
        async createPost(_, { body }, context) {
            // console.log('test');
            const user = checkAuth(context)

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()

            })
            const post = await newPost.save()
            return post;
        },
        async delPost(_, { postId }, context) {
            const user = checkAuth(context)
            try {
                const post = await Post.findById(postId)
                if (user.username === post.username) {
                    await post.delete()
                    return 'Post removed'
                } else {
                    throw new AuthenticationError('Not allowed')
                }
            } catch (e) {
                throw new Error(e);
            }
        },
        async createComment(_, { postId, body }, context) {
            const { username } = checkAuth(context)
            if (body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: "Comment body can't be empty"
                    }
                })
            }
            const post = await Post.findById(postId)
            if (post) {
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date()

                })
                await post.save()
                return post
            } else {
                throw new UserInputError("Post doesn't exist")
            }
        },
        async deleteComment(_, { postId, commentId }, context) {
            const { username } = checkAuth(context)
            const post = await Post.findById(postId)
            if (post) {
                const commentIndex = post.comments.findIndex(a => a.id === commentId)
                if (post.comments[commentIndex].username === username) {
                    post.comments.splice(commentIndex, 1)
                    await post.save()
                    return post
                } else {
                    throw new AuthenticationError('This is not allowed')
                }
            } else {
                throw new UserInputError('Post not found')
            }
        },
        async likePost(_, { postId }, context) {
            const { username } = checkAuth(context)
            const post = await Post.findById(postId)
            if (post) {
                if (post.likes.find(like => like.username === username)) {
                    post.likes = post.likes.filter(like => like.username !== username)
                } else {
                    post.likes.push({
                        username,
                        createdAt: new Date()
                    })
                }
                await post.save()
                return post
            } else {
                throw new UserInputError('Post not found')
            }
        }

    }
}

module.exports = resolvers;