const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  city: String,
  state: String,
  pinCode: String,
});

const contactSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["phone", "email"],
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    contacts: [contactSchema],
    address: addressSchema,
    tickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
