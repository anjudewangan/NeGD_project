require("./env");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const logger = require("./utils/logger");
const errorHandler = require("./middleware/errorHandler");
const authMiddleware = require("./middleware/authMiddleware");

// Ensure 'attachments' folder exists
const uploadDir = path.join(__dirname, "attachments");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server communication without Origin header
      if (!origin || process.env.ALLOWED_ORIGINS.split(",").includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: process.env.ALLOWED_METHODS.split(","),
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("uploads"));

app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/telephony", authMiddleware, require("./routes/telephonyApi"));
app.use("/api/v1/tickets", authMiddleware, require("./routes/tickets"));
app.use("/api/v1/departments", authMiddleware, require("./routes/department"));
app.use(
  "/api/v1/ticketSubjects",
  // authMiddleware,
  require("./routes/ticketSubject")
);
app.use("/api/v1/otp", require("./routes/otp"));
app.use("/api/v1/customers", require("./routes/customer"));
app.use("/api/v1/agents", authMiddleware, require("./routes/agents"))
app.use('/api/v1/services', authMiddleware, require('./routes/services'))

// Error Handling Middleware
app.use(errorHandler);
module.exports = {
  app,
};
