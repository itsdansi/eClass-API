const nodemailer = require("nodemailer");
const config = require("./../config/config.json");

module.exports = sendEmail;

async function sendEmail({ to, subject, html, from = config.EMAILFROM }) {
  const transporter = nodemailer.createTransport(config.SMTPCONFIG);
  await transporter.sendMail({ from, to, subject, html });
}
