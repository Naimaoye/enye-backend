const express = require('express');
const { ApolloServer, graphqlConnect } = require('apollo-server-express');
const bodyParser = require('body-parser');

const schema = require('./schema/index');
const resolvers = require('./resolvers/location');

const gqlServer = () => {
    const app = express();

    app.use(bodyParser.json());

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST'
        );
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    app.use((error, req, res, next) => {
        const status = error.statusCode || 500;
        const message = error.message;
        const data = error.data;
        res.status(status).json({ message: message, data: data });
    });

    const apolloServer = new ApolloServer({
        typeDefs: schema,
        resolvers,
        introspection: true,
        playground: true
    });

    apolloServer.applyMiddleware({ app, path: '/', cors: true });


    return app;
}

module.exports = gqlServer;
