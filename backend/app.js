// var createError = require('http-errors');
const express = require('express')
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const bodyParser = require('body-parser')
// const OAuthServer = require('express-oauth-server')

const app = express()
const v1Router = require('')
// Define the oauth model, which will be used by the wrapper
// todo1 implement the auth model for
// todo1.1 first you need prepare the database
// const oauthModel = {
//   getClient: function (clientId, clientSecret, callback) {
//     // Implement your logic to retrieve the client
//     console.log('getClient')
//   },
//   getUser: function (username, password, callback) {
//     // Implement your logic to retrieve the user
//     console.log('getUser')
//   },
//   saveToken: function (token, client, user, callback) {
//     // Implement your logic to save the token
//     console.log('saveToken')
//   },
//   getAccessToken: function (accessToken, callback) {
//     // Implement logic to retrieve the access token
//     console.log('getAccessToken:', accessToken)
//   },
//   // Implement other required methods as per the oauth2-server documentation
// };
// app.oauth = new OAuthServer({
//   model: {},
// })
// // for oauth
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(app.oauth.authenticate())
// app.use(app.oauth.authorize())

// OAuth token endpoint
// app.post('/oauth/token', app.oauth.token());

// Middleware to authenticate requests
// app.use(app.oauth.authenticate());

// Example of a protected route
// app.get('/secret', (req, res) => {
//   // If the request is authenticated, the user will have access to this route
//   res.json({ message: 'You have accessed the protected area' });
// });

app.use('/api/v1')

module.exports = app
