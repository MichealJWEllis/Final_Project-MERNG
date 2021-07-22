const express = require('express');
const { ApolloServer } = require('apollo-server-express')
// const mongoose = require('mongoose');
// const { MONGODB } = require('./config/config.js');

const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection.js');


const server = new ApolloServer({
    typeDefs,
    resolvers

})
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// mongoose.connect(MONGODB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// })
//     .then(() => {
//         console.log('MongoDB Connected');
//         return app.listen(PORT, () => {
//             console.log(`API server running on port ${PORT}!`);
//         });
//     }).then((res) => {
//         console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
//     })

db.once('open', () => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        // log where we can go to test our GQL API
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
});