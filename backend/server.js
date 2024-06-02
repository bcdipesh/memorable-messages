const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const cors = require("cors");

const app = express();

// Use cors middleware
app.use(cors());

app.use(bodyParser.json());

// In-memory storage for scheduled tasks
const scheduledEmails = [];

// Health endpoint
app.get("/health", (req, res) => {
  return res.status(200).send("Server is up and running.");
});

// Email scheduling endpoint
app.post("/schedule-email", (req, res) => {
  const { occasionType, receiverEmail, deliveryDate, message } = req.body;

  const date = new Date(deliveryDate);
  //   const now = new Date();
  //   if (date <= now) {
  //     return res.status(400).send("Scheduled time must be in the future");
  //   }

  // Schedule the email using node-cron
  const cronTime = `${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${
    date.getMonth() + 1
  } *`;
  const task = cron.schedule(cronTime, () => {
    sendEmail(receiverEmail, occasionType, message);
    task.stop();
  });

  scheduledEmails.push({ receiverEmail, message, deliveryDate, task });

  res.send("Email scheduled successfully");
});

// Email sending function using nodemailer
const sendEmail = (receiverEmail, occasionType, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bcdipeshwork@gmail.com",
      pass: "nwer fosx pyeb whpu",
    },
  });

  const mailOptions = {
    from: "memorable-messages@gmail.com",
    to: receiverEmail,
    subject: `Happy ${occasionType}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
