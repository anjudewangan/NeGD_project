const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["open", "in-progress", "reviewed", "closed"],
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  comments: String,
});

const messageSchema = new mongoose.Schema({
  messageType: {
    type: String,
    enum: ["email", "chat"]
  },
  messageId: String,
  senderType: {
    type: String,
    enum: ["agent", "customer", "system"],
    required: true,
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
  message: {
    type: String,
    required: true,
  },
  isHtml: {
    type: Boolean,
    default: false
  },
  attachments: [String], // Paths to attached files
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ticketSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  source: {
    type: String,
    enum: ["IVR", "Email", "Chat"],
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    // required: true,
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "TicketSubject",
  },
  subject: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  alternateMobile: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  sla: {
    type: Number,
    default: 0,
  },
  firstResponseTime: {
    type: Date,
  },
  attachments: [String], // Paths to attached files
  statusHistory: [statusSchema],
  messages: [messageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  closedAt: Date,
});

// ticketSchema.createIndex({
//   agentId: 1,
//   "statusHistory.status": 1,
// });

ticketSchema.index({
  agentId: 1,
  "statusHistory.status": 1
})

module.exports = mongoose.model("Ticket", ticketSchema);
