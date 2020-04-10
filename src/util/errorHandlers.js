const { HTTP404Error, HttpClientError } = require("./httpErrors");
const config = require("../config");

const notFoundError = () => {
  throw new HTTP404Error("Method not found");
};

const clientError = (err, res, next) => {
  if (err instanceof HttpClientError) {
    const errRes = {
      status: err.statusCode,
      message: err.message,
    };
    res.status(err.statusCode).json(errRes);
  } else {
    next(err);
  }
};

const serverError = (err, res, next) => {
  if (config.env === "production") {
    res.status(500).json("Internal Server Error");
  } else {
    res.status(500).json(err.stack);
  }
};

module.exports = {
  notFoundError,
  clientError,
  serverError,
};
