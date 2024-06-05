"use strict";
/** Shared config for application; can be required in many places. */
const nodemailer = require("nodemailer");

require("dotenv").config();
require("colors");

const PORT = +process.env.PORT || 3001;

// Database configuration.
function getDatabaseUri() {
  return process.env.DB_CONNECTION_STRING;
}

// Nodemailer configuration.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

console.log("Memorable Messages Config:".green);
console.log("PORT:".yellow, PORT);
console.log("---");

module.exports = {
  PORT,
  getDatabaseUri,
  transporter,
};
