require("dotenv").config();
const express = require("express");
const { API_PREFIX } = require("./config");
const { registerMiddleware, registerErrorHandlers, routes } = require("./api");
const { runSeeds } = require('./models/seeds');
const mongoConnection = require("./db");

// create dabase connection
mongoConnection();


// run database seeds
(async () => {
    await runSeeds();
})();

// init app
const app = express();

// register common middleware
registerMiddleware(app);

// apply routes
app.use(API_PREFIX, routes());

// error handlers
registerErrorHandlers(app);

module.exports = app;
