const staffService = require("../../services/staff.service");
const roleService = require("../../services/role.service");
const { HTTP403Error, HTTP401Error } = require("../../util/httpErrors");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const { logger, emailUtil } = require("../../util");

/**@description Login the staff member
 *
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      // missing fields
      throw new HTTP403Error("Email and password are required.");
    }

    const loginResult = await staffService.login(email, password);

    if (loginResult.isAuth) {
      // get the staff member

      const staffMember = await staffService.getStaffMemberByEmail(email);

      // create a token
      const payload = { email, id: staffMember._id };
      const token = jwt.sign(
        payload,
        config.jwt.secret,
        config.jwt.tokenOptions
      );

      const role = await roleService.getRoleById(staffMember.role);
      const result = {
        isAuth: true,
        token,
        user: {
          id: staffMember._id,
          email: staffMember.email,
          fName: staffMember.fName,
          lname: staffMember.lName,
          role: {
            name: role.name,
            permissions: role.permissions,
          },
          isNew: staffMember.isNewMember,
        },
      };

      // send response
      res.status(200).json(result);
    } else {
      throw new HTTP401Error("Authentication error");
    }
  } catch (error) {
    next(error);
  }
};

const signupAdmin = async (req, res, next) => {
  const { email, fName, lName } = req.body;

  try {
    if (!email || !fName || !lName) {
      // missing fields
      throw new HTTP403Error("Email, first name and last name are required");
    }

    if (await staffService.emailExist(email)) {
      throw new HTTP403Error("Email already exist");
    }

    const adminRoleId = await roleService.getAdminRoleId();

    const result = await staffService.addStaffMember({
      email,
      fName,
      lName,
      role: adminRoleId,
    });
    if (result.success) {
      //   send email with tmp password
      await emailUtil.sendStaffTempPasswordMsg(email, fName, result.password);
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    next(error);
  }
};

const hasAdmin = async (req, res, next) => {
  try {
    const adminCount = await staffService.getAdminCount();
    if (adminCount > 0) {
      res.json({
        hasAnAdmin: true,
      });
      return;
    }
    res.json({
      hasAnAdmin: false,
    });
  } catch (error) {
    next(error);
  }
};

const updateTemporaryPassword = async (req, res, next) => {
  const { updatedPassword } = req.body;

  try {
    // get info added by the auth token
    const userInfo = req.decoded;

    if (!staffService.getIsNewUser(userInfo.id)) {
      throw new HTTP403Error(
        "Only a new member can update a temporary password."
      );
    }

    if (!updatedPassword) {
      throw new HTTP403Error("Updated password is required!");
    }

    const result = await staffService.updatePassword(
      userInfo.id,
      updatedPassword
    );

    if (result) {
      return res.json({
        success: true,
      });
    } else {
      res.json({
        success: false,
      });
    }
    return res.json({
      success: false,
    });
  } catch (error) {
    next(error);
  }
};

const addUser = async (req, res, next) => {
  const { email, fName, lName, roleId } = req.body;
  try {
    if (!email || !fName || !lName || !roleId) {
      throw new HTTP403Error("Required fields are missing");
    }

    // check if role exists
    if (!(await roleService.getRoleById(roleId))) {
      throw new HTTP403Error("Invalid role provided");
    }

    const addedUser = await staffService.addStaffMember({
      email,
      fName,
      lName,
      role: roleId,
    });

    if (!addedUser.success) {
      throw new Error("Failed to add user");
    }

    // send email to user
    await emailUtil.sendStaffTempPasswordMsg(email, fName, addedUser.password);

    // clear password before sending the response
    addedUser.user.password = null;

    return res.json(addedUser.user);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new HTTP403Error("User id is missing in the URL");
    }
    const userInfo = req.decoded;

    if (id !== userInfo.id) {
      // id and token owner id doesn't match
      throw new HTTP401Error("Not allowed to access this information");
    }

    const staffMember = await staffService.getStaffMemberByEmail(
      userInfo.email
    );

    if (!staffMember) {
      throw new HTTP401Error("Unauthorized");
    }

    const role = await roleService.getRoleById(staffMember.role);
    const result = {
      user: {
        id: staffMember._id,
        email: staffMember.email,
        fName: staffMember.fName,
        lname: staffMember.lName,
        role: {
          name: role.name,
          permissions: role.permissions,
        },
        isNew: staffMember.isNewMember,
      },
    };

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const userInfo = req.decoded;
    if (
      !(await roleService.hasPermission(
        await staffService.getRoleOfStaffMember(userInfo.id),
        roleService.Permissions.user,
        roleService.PermissionModes.read
      ))
    ) {
      // no permission
      throw new HTTP401Error("Not authorized");
    }

    const users = await staffService.getAllStaffMembers();

    return res.json(users);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { email, fName, lName, roleId } = req.body;

  try {
    const userInfo = req.decoded;
    if (
      !(await roleService.hasPermission(
        await staffService.getRoleOfStaffMember(userInfo.id),
        roleService.Permissions.user,
        roleService.PermissionModes.write
      ))
    ) {
      // no permission
      throw new HTTP401Error("Not authorized");
    }

    if (!id) {
      throw new HTTP403Error("Missing user id in the URL");
    }

    const result = await staffService.updateStaffMember({
      id,
      fName,
      lName,
      email,
      roleId,
    });

    if (result.tempPassword) {
      // email has been updated
      // send new temporary password
      await emailUtil.sendStaffTempPasswordMsg(
        email,
        fName,
        result.tempPassword
      );
    }
    const updatedStaffMember = await staffService.getStaffMemberById(id);

    return res.json(updatedStaffMember);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const userInfo = req.decoded;

    if (
      !(await roleService.hasPermission(
        await staffService.getRoleOfStaffMember(userInfo.id),
        roleService.Permissions.user,
        roleService.PermissionModes.write
      ))
    ) {
      // no permission
      throw new HTTP401Error("Not authorized");
    }

    if (!id) {
      throw new HTTP403Error("Missing user id in the URL");
    }

    const result = await staffService.deleteStaffMember(id);
    if (result) {
      return res.json({ deleted: true });
    }
    return res.json({ deleted: false });
  } catch (error) {
    next(error);
  }
};

const addRole = async (req, res, next) => {
  const { role } = req.body;
  const userInfo = req.decoded;
  const user = await staffService.getStaffMemberById(userInfo.id);


  try {
    if (!(await roleService.isAdimnRole(user.role._id))) {
      throw new HTTP401Error("Unauthorized");
    }
    if (!role || !roleService.validateRole(role)) {
      // invalid role object
      throw new HTTP403Error("Missing or invalid fields in the role");
    }

    const result = await roleService.createRole(role);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const getAllRoles = async (req, res, next) => {
  try {
    const userInfo = req.decoded;
    const user = await staffService.getStaffMemberById(userInfo.id);

    if (!(await roleService.isAdimnRole(user.role._id))) {
      throw new HTTP401Error("Unauthorized");
    }

    let roles = await roleService.getAllRoles();

    roles = await roles.map(async (role) => {
      const userCount = await staffService.staffMemberCountOfRole(role._id);
      return {
        _id: role._id,
        name: role.name,
        permissions: role.permissions,
        userCount,
      };
    });

    Promise.all(roles).then((updatedRoles) => res.json(updatedRoles));
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  const roleId = req.params.id;
  const { role } = req.body;
  try {
    const userInfo = req.decoded;
    const user = await staffService.getStaffMemberById(userInfo.id);

    if (!(await roleService.isAdimnRole(user.role._id))) {
      throw new HTTP401Error("Unauthorized");
    }

    if (await roleService.isAdimnRole(roleId)) {
      // cannot update the admin role
      throw new HTTP401Error("Unauthorized! Cannot update the admin account");
    }

    if (!roleId || !roleService.validateRole(role)) {
      throw new HTTP403Error("Invalid role format");
    }

    const updatedRole = await roleService.updateRole(
      roleId,
      role.name,
      role.permissions
    );

    return res.json(updatedRole);
  } catch (error) {
    next(error);
  }
};

const deleteRole = async (req, res, next) => {
  const roleId = req.params.id;
  try {
    const userInfo = req.decoded;
    const user = await staffService.getStaffMemberById(userInfo.id);

    if (!(await roleService.isAdimnRole(user.role._id))) {
      throw new HTTP401Error("Unauthorized");
    }

    if (!roleId) {
      throw new HTTP403Error("Missing role id");
    }

    if (await roleService.isAdimnRole(roleId)) {
      // cannot delete the admin role
      throw new HTTP401Error("Unauthorized! Cannot delete the admin account");
    }

    if ((await staffService.staffMemberCountOfRole(roleId)) > 0) {
      // we already have users with this role, so cannot delete it
      throw new HTTP401Error(
        "Cannot delete role. User count with this role is greater than zero"
      );
    }

    const deleted = await roleService.deleteRole(roleId);

    return res.json({ deleted });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  signupAdmin,
  hasAdmin,
  updateTemporaryPassword,
  getUser,
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addRole,
  getAllRoles,
  updateRole,
  deleteRole,
};
