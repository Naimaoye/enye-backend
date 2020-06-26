const functions = require('firebase-functions');
const express = require("express");
const axios = require("axios");
const cors = require("cors");
// const admin = require("firebase-admin");
const moment = require("moment");
const config = require("./config");
const firebase = require("firebase");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");
const port = process.env.PORT || 4000;



// admin.initializeApp({
//   databaseURL: config.databaseURL,
//   storageBucket: config.storageBucket
// });

firebase.initializeApp(config);
const db = firebase.firestore();
const app = express();
app.use(cors());


const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const schema = new ApolloServer({
  typeDefs,
  resolvers,
  playground:true,
  introspection:true
});


schema.applyMiddleware({ app, path: "/graphql",cors:true });
const graphQLServer = http.createServer(app);
schema.installSubscriptionHandlers(graphQLServer);

exports.graphql = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
