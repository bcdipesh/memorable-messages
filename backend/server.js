const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure database connection
const sequelize = new Sequelize("dipeshbc", "dipeshbc", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

// Create database model for Occasions table
const Occasion = sequelize.define(
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

// Configure Nodemailer to use Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

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

let scheduledEmails = [];

// Endpoint to schedule email
app.post("/schedule-email", async (req, res) => {
  const { email, subject, message, date } = req.body;
  const sendTime = new Date(date);

  if (sendTime <= new Date()) {
    // If the scheduled time is in the past or immediate, send the email immediately
    await sendEmail({ email, subject, message, sendTime });
    return res.send(
      "Email sent immediately as the scheduled time was in the past or now.",
    );
  }

  // Add email job to the schedule
  scheduledEmails.push({ email, subject, message, sendTime });

  res.send("Email scheduled successfully.");
});

// Endpoint for occasions
app.get("/occasions", async (req, res) => {
  const occasions = await Occasion.findAll({
    where: {
      user_id: req.query.userId,
    },
  });

  res.send(occasions);
});

app.get("/occasions/:id", async (req, res) => {
  const occasion = await Occasion.findByPk(req.params.id);

  res.send(occasion);
});

app.post("/occasions", async (req, res) => {
  const {
    user_id,
    occasion_type,
    receiver_email,
    delivery_method,
    delivery_date,
    message,
    created_at,
  } = req.body;

  const occasion = await Occasion.create({
    user_id,
    occasion_type,
    receiver_email,
    delivery_method,
    delivery_date,
    message,
    created_at,
  });

  res.status(201).send(occasion);
});

app.put("/occasions/:id", async (req, res) => {
  const updatedOccasion = await Occasion.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  res.send(updatedOccasion);
});

app.delete("/occasions/:id", async (req, res) => {
  await Occasion.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(204).send();
});

// Cron job to check and send scheduled emails
cron.schedule("* * * * *", async () => {
  const now = new Date();
  const pendingEmails = [];

  for (const emailJob of scheduledEmails) {
    if (emailJob.sendTime <= now) {
      await sendEmail(emailJob);
    } else {
      pendingEmails.push(emailJob);
    }
  }

  // Log pending and scheduledEmails
  console.log("Scheduled Emails:", scheduledEmails);
  console.log("Pending Emails:", pendingEmails);

  // Update the scheduledEmails array with pending emails
  scheduledEmails = pendingEmails;
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
