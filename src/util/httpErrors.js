class HttpClientError extends Error {
  constructor(message) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }
    this.statusCode = 0;

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class HTTP400Error extends HttpClientError {
  constructor(message = "Bad request") {
    super(message);
    this.statusCode = 400;
  }
}

class HTTP401Error extends HttpClientError {
  constructor(message = "Authentication failed") {
    super(message);
    this.statusCode = 401;
  }
}

class HTTP403Error extends HttpClientError {
  constructor(message = "Bad request") {
    super(message);
    this.statusCode = 403;
  }
}

class HTTP404Error extends HttpClientError {
  constructor(message = "Not found") {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = {
  HttpClientError,
  HTTP400Error,
  HTTP401Error,
  HTTP403Error,
  HTTP404Error,
};
