const staffService = require("../../services/staff.service");
const roleService = require('../../services/role.service');
const { HTTP403Error, HTTP401Error } = require("../../util/httpErrors");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const { logger, email: emailUtil } = require("../../util");

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
          email: staffMember.email,
          fName: staffMember.fName,
          lname: staffMember.lName,
<<<<<<< HEAD
          role: {
            name: role.name,
            permissions: role.permissions
          },
          isNew: staffMember.isNewMember
=======
          role: staffMember.role,
          isNewMember: staffMember.isNewMember
>>>>>>> 7b123a4930ae6bc18f79b909405ec249c135f771
        }
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
      await emailUtil.sendStaffTempPasswordMsg(
        email,
        fName,
        result.password
      );
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
        hasAnAdmin: true
      });
      return;
    }
    res.json({
      hasAnAdmin: false
    })
  } catch (error) {
    next(error);
  }
}

const updateTemporaryPassword = async (req, res, next) => {
  const { updatedPassword } = req.body;

  try {

    // get info added by the auth token
    const userInfo = req.decoded;

    if (!staffService.getIsNewUser(userInfo.id)) {
      throw new HTTP403Error('Only a new member can update a temporary password.');
    }


    if (!updatedPassword) {
      throw new HTTP403Error('Updated password is required!');
    }

    const result = await staffService.updatePassword(userInfo.id, updatedPassword);

    if (result) {
      return res.json({
        success: true
      })
    } else {

      res.json({
        success: false
      })
    }
<<<<<<< HEAD
    return res.json({
      success: false
    })
=======
>>>>>>> 7b123a4930ae6bc18f79b909405ec249c135f771

  } catch (error) {
    next(error);
  }
}

const getUser = async (req, res, next) => {

  try {
    const userInfo = req.decoded;

    const staffMember = await staffService.getStaffMemberByEmail(userInfo.email);

    if (!staffMember) {
      throw new HTTP401Error("Unauthorized");
    }


    const role = await roleService.getRoleById(staffMember.role);
    const result = {
      isAuth: true,
      user: {
        email: staffMember.email,
        fName: staffMember.fName,
        lname: staffMember.lName,
        role: {
          name: role.name,
          permissions: role.permissions
        },
        isNew: staffMember.isNewMember
      }
    };

    return res.json(result);
  } catch (error) {
    next(error)
  }
}

const addRole = async (req, res, next) => {
  const { role } = req.body;

  try {
    if (role === null || !roleService.validateRole(role)) {
      // invalid role object
      throw new HTTP403Error('Missing or invalid fields in the role');
    }

    await roleService.createRole(role);
    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  signupAdmin,
  hasAdmin,
  updateTemporaryPassword,
  getUser,
  addRole
};
