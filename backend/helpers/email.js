"use strict";
/** Email helper functions. */
const { transporter } = require("../config");

require("dotenv").config();

// Helper function to send email
const sendEmail = async (emailJob) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: emailJob.email,
    subject: emailJob.subject,
    text: emailJob.message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${emailJob.email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
