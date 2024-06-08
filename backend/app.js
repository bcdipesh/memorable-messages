"use strict";
/** Express app for memorable-messages. */
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const morgan = require("morgan");
const occasionRoutes = require("./routes/occasions");
const sendEmail = require("./helpers/email");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/occasions", occasionRoutes);

// Endpoint to check health
app.get("/health", (req, res, next) =>
  res.json({ message: "Server is up and running." }),
);

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

/** Handle 404 errors -- this matches everything. */
app.use((req, res, next) => next(new Error("Not Found")));

/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
