const express = require('express');
const { ApolloServer } = require('apollo-server-express')
const { gql } = require("apollo-server-express");


const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const db = require('./config/connection');

const typeDefs = gql`
    type Query{
        sayHi: String!
    }

`
const resolvers = {
    Query: {
        sayHi: () => 'hello world'
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers

})
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        // log where we can go to test our GQL API
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
});
