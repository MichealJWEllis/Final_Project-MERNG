const { User, Post } = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { KEY } = require("../config/config")

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
        async register(_, { registerInput: { username, email, password, confirmPassword } }, context, info) {
            password = await bcrypt.hash(password, 10);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date()
            })

            const res = await newUser.save();
            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, KEY, { expiresIn: '1hr' });

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}

module.exports = resolvers;