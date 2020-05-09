const bcrypt = require("bcrypt");
const generatePassword = require("generate-password");

exports.hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

exports.generatePassword = () => {
  // generate password
  const tempPassword = generatePassword.generate({
    length: 10,
    numbers: true,
  });

  return tempPassword;
};
