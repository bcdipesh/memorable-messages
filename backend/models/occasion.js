"use strict";
/** Database model for occasions table. */
const { DataTypes } = require("sequelize");
const db = require("../db.js");

const Occasion = db.define(
  "occasions",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    occasion_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiver_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Occasion;
