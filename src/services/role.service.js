const Role = require('../models/role.model');


const getAdminRoleId = async () => {
    const adminRole = await Role.findOne({ name: 'admin' });
    if (!adminRole) {
        return null;
    }

    return adminRole._id;
}

const roleKeys = ['name', 'permissions'];
const permissionKeys = ['user', 'category', 'product', 'order', 'customer', 'inquiry', 'sales'];
const permissionModeKeys = ['read', 'write'];

const validateRole = (role) => {

    if (Object.keys(role).length !== roleKeys.length) {
        return false;
    }

    for (const roleKey of Object.keys(role)) {
        if (!roleKeys.includes(roleKey)) {
            return false;
        }
    };

    if (Object.keys(role.permissions).length !== permissionKeys.length) {
        return false;
    }

    for (const permissionKey of Object.keys(role.permissions)) {
        if (!permissionKeys.includes(permissionKey)) {
            return false;
        }

        if (Object.keys(role.permissions[permissionKey]).length !== permissionModeKeys.length) {
            return false;
        }

        for (const permissionModeKey of Object.keys(role.permissions[permissionKey])) {
            if (!permissionModeKeys.includes(permissionModeKey)) {
                return false;
            }
        }
    }

    return true;

}

const createRole = async (roleDto) => {
    const newRole = new Role(roleDto);
    await newRole.save();
    return newRole;
}

const getRoleById = async (roleId) => {
    const role = await Role.findById(roleId);
    return role;
}

module.exports = {
    getAdminRoleId,
    validateRole,
    createRole,
    getRoleById
}
