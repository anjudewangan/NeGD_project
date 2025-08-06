const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const agentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    extensionCode: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "agent", "manager"],
      default: "agent",
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    languages: {
      type: [String],
      default: ["en"],
    },
    password: { type: String, required: true },
    managedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agents",
    },
  },
  { timestamps: true }
);

// Compare password method
agentSchema.methods.comparePassword = async function (password) {
  return password === this.password;
};

// Generate auth token method
agentSchema.methods.generateAuthToken = function () {
  const payload = {
    id: this._id,
    role: this.role,
    extensionCode: this.extensionCode,
    departmentId: this.departmentId,
    languages: this.languages,
    name: this.name,
    username: this.username,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });

  return token;
};

// Automatically remove password when converting to JSON
agentSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const Agent = mongoose.model("agents", agentSchema);
module.exports = Agent;