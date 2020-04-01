const userService = require("../../services/user.service");

/**@description Login the user
 *
 */
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (userService.login(email, password)) {
    // email and password are correct
  } else {
    // incorrect passwords
  }

  res.json({ data: "hello" });
};

const signUp = (req, res, next) => {};

module.exports = {
  login,
  signUp
};
