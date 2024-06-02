const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

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
