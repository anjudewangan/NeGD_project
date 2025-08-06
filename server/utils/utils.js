const mongoose = require("mongoose");
const Ticket = require("../models/Tickets");
const ObjectId = mongoose.Types.ObjectId;

const findRecursive = async (id, model) => {
  let current = await model.findOne({ _id: new ObjectId(id) });

  if (!current) throw new Error("Subject not found");

  const pathSegments = [current.name];

  while (current.parentId) {
    current = await model.findOne({
      _id: current.parentId,
    });
    if (current) pathSegments.unshift(current.name);
    else break; // broken reference
  }

  return pathSegments.join("/");
};

function generateOTP(length = 6) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
}

/**
 * depends on the Ticket model
 * @returns Unique Ticket number that is not been used.
 *
 */
const generateUniqueTicketNumber = async () => {
  const maxAttempts = 5;

  for (let i = 0; i < maxAttempts; i++) {
    const ticketNumber = Math.floor(
      1000000 + Math.random() * 9000000
    ).toString();

    const exists = await Ticket.exists({ ticketNumber });
    if (!exists) {
      return ticketNumber;
    }
  }

  throw new Error(
    "Failed to generate a unique ticket number after multiple attempts."
  );
};

module.exports = {
  findRecursive,
  generateOTP,
  generateUniqueTicketNumber,
};