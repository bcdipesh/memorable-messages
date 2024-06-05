"use strict";
/** Database setup for memorable-messages. */
const { Sequelize } = require("sequelize");
const { getDatabaseUri } = require("./config");

let db;

db = new Sequelize(getDatabaseUri());

// Test the connection
db.authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

module.exports = db;
