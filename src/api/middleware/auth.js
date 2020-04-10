const jwt = require("jsonwebtoken");
const { HTTP403Error, HTTP401Error } = require("../../util/httpErrors");
const config = require("../../config");

const verifyJWTToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new HTTP403Error(`Authentication token is missing`);
  }

  // extract token from auth header
  // Bearer <token>
  const token = authHeader.split(" ")[1];

  try {
    const decodedResult = jwt.verify(
      token,
      config.jwt.secret,
      config.jwt.tokenOptions
    );

    // add the decoded token to the request
    req.decoded = decodedResult;

    // continue
    next();
  } catch (error) {
    // invalid token
    throw new HTTP401Error("Authentication error. Invalid token");
  }
};

module.exports = {
  verifyJWTToken,
};
