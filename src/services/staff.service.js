const StaffMember = require("../models/staff.model");
const roleService = require("./role.service");
const bcrypt = require("bcrypt");
const { generatePassword, hashPassword } = require("../util/password");

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
  };
  const staffMember = await StaffMember.findOne({ email });
  if (!staffMember) {
    return result;
  }

  const passwordMatches = await bcrypt.compare(password, staffMember.password);

  if (passwordMatches) {
    result.isAuth = true;
    return result;
  } else {
    return result;
  }
};

const addStaffMember = async (staffMemberDto) => {
  const newStaffMember = new StaffMember();
  newStaffMember.email = staffMemberDto.email;
  newStaffMember.fName = staffMemberDto.fName;
  newStaffMember.lName = staffMemberDto.lName;
  newStaffMember.role = staffMemberDto.role;

  // // generate password
  const tempPassword = generatePassword();

  // hash the password
  const hashedPassword = await hashPassword(tempPassword);

  // generate hashed temporary password
  newStaffMember.password = hashedPassword;

  const addedRecord = await newStaffMember.save();

  if (addedRecord) {
    return { success: true, password: tempPassword, user: addedRecord };
  }

  return { success: false };
};

const updateStaffMember = async (staffMemberDto) => {
  const staffMember = await getStaffMemberById(staffMemberDto.id);

  const result = {
    tempPassword: null,
  };

  if (staffMemberDto.fName) {
    staffMember.fName = staffMemberDto.fName;
  }

  if (staffMemberDto.lName) {
    staffMember.lName = staffMemberDto.lName;
  }

  if (staffMemberDto.role) {
    staffMember.role = staffMemberDto.role;
  }

  if (staffMemberDto.email && staffMember.email !== staffMemberDto.email) {
    // email has been updated
    staffMember.email = staffMemberDto.email;
    result.tempPassword = generatePassword();
    staffMember.password = await hashPassword(result.tempPassword);
  }

  await staffMember.save();

  return result;
};

const deleteStaffMember = async (id) => {
  const result = await StaffMember.deleteOne({ _id: id });

  return result.deletedCount && result.deletedCount === 1;
};

const getAdminCount = async () => {
  const adminRoleId = await roleService.getAdminRoleId();
  const adminCount = await StaffMember.find({
    role: adminRoleId,
  }).countDocuments();
  return adminCount;
};

const emailExist = async (email) => {
  const userCountWithEmail = await StaffMember.find({ email }).countDocuments();
  return userCountWithEmail !== 0;
};

const updatePassword = async (id, newPassword) => {
  const staffMember = await StaffMember.findOne({ _id: id });

  if (!staffMember) {
    return false;
  }

  // hash password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  staffMember.password = hashedPassword;
  staffMember.isNewMember = false;

  await staffMember.save();

  return true;
};

const getIsNewUser = async (id) => {
  const staffMember = await StaffMember.findOne({ _id: id });

  if (!staffMember) {
    return false;
  }

  return staffMember.isNewMember;
};

const getStaffMemberByEmail = async (email) => {
  const staffMember = await StaffMember.findOne({ email });

  if (!staffMember) {
    return null;
  }

  return staffMember;
};

const getStaffMemberById = async (id) => {
  const staffMember = await StaffMember.findOne({ _id: id });

  if (!staffMember) {
    return null;
  }

  return staffMember;
};

const getAllStaffMembers = async () => {
  const staffMembers = await StaffMember.find().populate("role");
  return staffMembers;
};

const getRoleOfStaffMember = async (id) => {
  const staffMember = await StaffMember.findOne({ _id: id });
  const role = await roleService.getRoleById(staffMember.role);
  return role;
};

const staffMemberCountOfRole = async (roleId) => {
  return await StaffMember.find({ role: roleId }).countDocuments();
};

module.exports = {
  login,
  addStaffMember,
  getAdminCount,
  updatePassword,
  getIsNewUser,
  getStaffMemberByEmail,
  getStaffMemberById,
  emailExist,
  getAllStaffMembers,
  updateStaffMember,
  deleteStaffMember,
  getRoleOfStaffMember,
  staffMemberCountOfRole,
};
