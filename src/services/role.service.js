const Role = require("../models/role.model");
const staffService = require("./staff.service");
const mongoose = require("mongoose");

const getAdminRoleId = async () => {
  const adminRole = await Role.findOne({ name: "admin" });
  if (!adminRole) {
    return null;
  }

  return adminRole._id;
};

const isAdimnRole = async (roleId) => {
  if (typeof roleId === "string") {
    roleId = mongoose.Types.ObjectId(roleId);
  }
  const adminRole = await Role.findOne({ name: "admin" });
  return adminRole._id.equals(roleId);
};

const Permissions = {
  user: "user",
  category: "category",
  product: "product",
  order: "order",
  customer: "customer",
  inquiry: "inquiry",
  sales: "sales",
};

const PermissionModes = {
  read: "read",
  write: "write",
};

const roleKeys = ["name", "permissions"];
const permissionKeys = [
  "user",
  "category",
  "product",
  "order",
  "customer",
  "inquiry",
  "sales",
];
const permissionModeKeys = ["read", "write"];

const validateRole = (role) => {
  if (Object.keys(role).length !== roleKeys.length) {
    return false;
  }

  for (const roleKey of Object.keys(role)) {
    if (!roleKeys.includes(roleKey)) {
      return false;
    }
  }

  if (Object.keys(role.permissions).length !== permissionKeys.length) {
    return false;
  }

  for (const permissionKey of Object.keys(role.permissions)) {
    if (!permissionKeys.includes(permissionKey)) {
      return false;
    }

    if (
      Object.keys(role.permissions[permissionKey]).length !==
      permissionModeKeys.length
    ) {
      return false;
    }

    for (const permissionModeKey of Object.keys(
      role.permissions[permissionKey]
    )) {
      if (!permissionModeKeys.includes(permissionModeKey)) {
        return false;
      }
    }
  }

  return true;
};

const createRole = async (roleDto) => {
  const newRole = new Role(roleDto);
  await newRole.save();
  return newRole;
};

const getRoleById = async (roleId) => {
  const role = await Role.findById(roleId);
  return role;
};

const getAllRoles = async () => {
  const roles = await Role.find();

  return roles;
};

const hasPermission = async (role, permissionKey, permissionModeKey) => {
  if (role.permissions[permissionKey][permissionModeKey]) {
    return true;
  }

  return false;
};

const deleteRole = async (roleId) => {
  const deleted = await Role.deleteOne({ _id: roleId });
  return deleted.deletedCount && deleted.deletedCount === 1;
};

const updateRole = async (roleId, name, permissions) => {
  const role = await Role.findOne({ _id: roleId });

  role.name = name;
  role.permissions = permissions;

  return await role.save();
};

module.exports = {
  getAdminRoleId,
  validateRole,
  createRole,
  getRoleById,
  Permissions,
  PermissionModes,
  hasPermission,
  getAllRoles,
  isAdimnRole,
  deleteRole,
  updateRole,
};
