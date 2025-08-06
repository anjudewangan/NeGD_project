const mongoose = require("mongoose");

const ticketSubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true, // for fast text search
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TicketSubject",
      default: null,
      index: true, // for hierarchical queries
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
      index: true, // for filtering by department
    },
    description: String,
    isActive: {
      type: Boolean,
      default: true,
      index: true, // for filtering active subjects
    },
  },
  { timeseries: true }
);

// Compound index to optimize hierarchy + active filtering
ticketSubjectSchema.index({ parentId: 1, isActive: 1 });

module.exports = mongoose.model("TicketSubject", ticketSubjectSchema);
