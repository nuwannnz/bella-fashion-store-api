const cors = require("cors");
const express = require("express");

module.exports = app => {
  // Add cors
  app.use(cors({ credentials: true, origin: true }));

  // Add body-parser
  app.use(express.json());

  // Append cors headers
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", [
      "POST",
      "GET",
      "DELETE",
      "PUT"
    ]);
    next();
  });
};
