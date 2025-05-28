const nodemailer = require("nodemailer");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => console.log("MongoDB connected"));

// Schemas
const Contact = mongoose.model("Contact", new mongoose.Schema({
  name: String,
  email: String,
  message: String,
}));

const Donation = mongoose.model("Donation", new mongoose.Schema({
  name: String,
  amount: Number,
  email: String,
}));

// Routes
app.post("/contact", async (req, res) => {
  try {
    await Contact.create(req.body);
    res.json({ message: "Message received. We'll get back to you!" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.post("/donate", async (req, res) => {
  try {
    await Donation.create(req.body);
    res.json({ message: "Thank you for your donation!" });
  } catch (err) {
    res.status(500).json({ message: "Donation failed." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS, // your email password or app password
  },
});
