const { User, Post } = require('../models')

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
    }
}

module.exports = resolvers;