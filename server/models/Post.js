const { model, Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const postSchema = new Schema({
    body: {
        type: String,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
    comments: [
        {
            body: String,
            username: String,
            createdAt: {
                type: Date,
                default: Date.now,
                get: timestamp => dateFormat(timestamp)
            }
        }
    ],
    likes: [
        {
            username: String,
            createdAt: {
                type: Date,
                default: Date.now,
                get: timestamp => dateFormat(timestamp)
            }
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
},
    {
        toJSON: {
            getters: true
        }
    });

const Post = model('Post', postSchema);
module.exports = Post