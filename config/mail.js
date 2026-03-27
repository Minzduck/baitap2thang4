const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "26dedd7185f389",
    pass: "0d1673c491421c"
  }
});

module.exports = transporter;