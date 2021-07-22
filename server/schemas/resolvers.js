const { User, Post } = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { KEY } = require("../config/config")
const { UserInputError } = require('apollo-server-express')
const { validationReg, validateLogin } = require('../utils/auth')
function genToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, KEY, { expiresIn: '1hr' });
}

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts;
            } catch (e) {
                throw new Error(e);
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
        }
    }
}

module.exports = resolvers;