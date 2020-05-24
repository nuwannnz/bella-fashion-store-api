const sgMail = require("@sendgrid/mail");
const config = require("../config");

const sendStaffTempPasswordMsg = async (to, fname, tempPassword) => {
  sgMail.setApiKey(config.SEND_GRID_KEY);
  const msg = {
    to,
    from: config.email.mainAddr,
    templateId: "d-2004b72d336241e697d293d3b5025d5a",
    dynamic_template_data: {
      fname,
      tempPassword,
    },
  };

  await sgMail.send(msg);
};

const sendCustomerJoiningMsg = async (to, fname) => {
  sgMail.setApiKey(config.SEND_GRID_KEY);
  const msg = {
    to,
    from: config.email.mainAddr,
    templateId: "d-6c3bb244b46847db9301db4c80309bd3",
    dynamic_template_data: {
      fname,
    },
  };

  await sgMail.send(msg);
};

const sendInquiryReplyMsg = async (to, name, subject, description) => {
  sgMail.setApiKey(config.SEND_GRID_KEY);
  const msg = {
    to,
    from: config.email.mainAddr,
    templateId: "d-6eb85b2044b64af4970d6e763a466892",
    dynamic_template_data: {
      name,
      subject,
      description,
    },
  };

  await sgMail.send(msg);
};

const sendPasswordResetCode = async (to, fName, code) => {
  sgMail.setApiKey(config.SEND_GRID_KEY);
  const msg = {
    to,
    from: config.email.mainAddr,
    templateId: "d-d35784decd044a03950d5b5e0827a3d6",
    dynamic_template_data: {
      fName,
      code,
    },
  };

  await sgMail.send(msg);
};

exports.email = {
  sendStaffTempPasswordMsg,
  sendCustomerJoiningMsg,
  sendInquiryReplyMsg,
  sendPasswordResetCode,
};
