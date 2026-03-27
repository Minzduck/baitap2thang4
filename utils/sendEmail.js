const transporter = require("../config/mail");

async function sendEmail(to, password) {
  try {
    await transporter.sendMail({
      from: '"System" <no-reply@test.com>',
      to: to,
      subject: "Account Information",
      text: `Your account has been created.\nPassword: ${password}`
    });

    console.log(`📧 Sent email to ${to}`);
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}`, error);
  }
}

module.exports = sendEmail;