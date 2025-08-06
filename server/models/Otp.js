const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  otp: String,
  key: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 10, // The document will be automatically deleted after 10 minutes of its creation time
  },
});

module.exports = new mongoose.model("otp", otpSchema);
