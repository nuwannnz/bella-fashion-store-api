const inquiryService = require("../../services/inquiry.service");
const staffService = require("../../services/staff.service");
const roleService = require("../../services/role.service");
const { HTTP403Error, HTTP401Error } = require("../../util/httpErrors");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const { logger, emailUtil } = require("../../util");

const addInquiry = async (req, res, next) => {
  const { inquiryDto } = req.body;

  try {
    if (
      !inquiryDto.name ||
      !inquiryDto.email ||
      !inquiryDto.phone ||
      !inquiryDto.subject ||
      !inquiryDto.description
    ) {
      throw new HTTP403Error("Missing fields");
    }

    const result = await inquiryService.addInquiry(inquiryDto);

    if (result) {
      return res.json(result);
    }
    return res.json(null);
  } catch (error) {
    next(error);
  }
};

const getInquiry = async (req, res, next) => {
  try {
    const userInfo = req.decoded;
    if (
      !(await roleService.hasPermission(
        await staffService.getRoleOfStaffMember(userInfo.id),
        roleService.Permissions.inquiry,
        roleService.PermissionModes.read
      ))
    ) {
      // no permission
      throw new HTTP401Error("Not authorized");
    }

    const inquiry = await inquiryService.getAllInquries();

    return res.json(inquiry);
  } catch (error) {
    next(error);
  }
};

const replyToInquiry = async (req, res, next) => {
  const { replyDto } = req.body;

  try {
    const userInfo = req.decoded;
    if (
      !(await roleService.hasPermission(
        await staffService.getRoleOfStaffMember(userInfo.id),
        roleService.Permissions.inquiry,
        roleService.PermissionModes.write
      ))
    ) {
      // no permission
      throw new HTTP401Error("Not authorized");
    }

    if (!replyDto.inquiryId || !replyDto.subject || !replyDto.description) {
      throw new HTTP403Error("Missing fields");
    }

    const inquiry = await inquiryService.getInquiryById(replyDto.inquiryId);

    await emailUtil.sendInquiryReplyMsg(
      inquiry.email,
      inquiry.name,
      replyDto.subject,
      replyDto.description
    );

    await inquiryService.markAsReplied(replyDto.inquiryId);

    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addInquiry,
  getInquiry,
  replyToInquiry,
};
