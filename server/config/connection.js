const mongoose = require('mongoose');
const { MONGODB } = require('./config.js')


mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/Final_Project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

module.exports = mongoose.connection;