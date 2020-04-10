const StaffMember = require("../models/staff.model");
const bcrypt = require("bcrypt");

/**@description Check whether the given email and password combination is
 * correct for a staff member
 *
 * @param {string} email - Email of the staff member
 * @param {string} password - Password of the staff member
 * @returns {Promise<object>} A promise which returns an object containing wheter the credntials are correct
 * and the staffmember is a newly added one
 */
const login = async (email, password) => {
  const result = {
    isAuth: false,
    isNew: false,
  };
  const staffMember = await StaffMember.findOne({ email });
  if (!staffMember) {
    return result;
  }

  const passwordMatches = await bcrypt.compare(password, staffMember.password);

  if (passwordMatches) {
    result.isAuth = true;
    result.isNew = staffMember.isNewMember;
    return result;
  } else {
    return result;
  }
};

module.exports = {
  login,
};
