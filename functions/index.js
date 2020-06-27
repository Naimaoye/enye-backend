const { https } = require('firebase-functions');
const gqlServer = require('./graphql/server');

const server = gqlServer();
exports.api = https.onRequest(server);
