const express = require("express");
const { API_PREFIX } = require("./config");
const { registerMiddleware, routes } = require("./api");
const mongoConnection = require("./db");

// create dabase connection
mongoConnection();

// init app
const app = express();

// register common middleware
registerMiddleware(app);

// apply routes
app.use(API_PREFIX, routes());

module.exports = app;
