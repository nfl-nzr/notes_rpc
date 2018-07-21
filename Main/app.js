const express = require('express');
const app = express();

const RouteController = require('./routes')
app.use('/user', RouteController);

module.exports = app;