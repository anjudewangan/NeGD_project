const jwt = require("jsonwebtoken");
const Customer = require("../models/Customers");
const TicketSubject = require("../models/TicketSubject");
const Ticket = require("../models/Tickets");
const { generateUniqueTicketNumber, findRecursive } = require("../utils/utils");
const logger = require("../utils/logger");
const Customers = require("../models/Customers");
const { transporter, mailOptions } = require("../utils/mail");
const { newTicketTemplate } = require("../utils/emailTemplates");

exports.customerDetails = async (req, res) => {
  const { token } = req.query;
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token", error });
  }

  // find customer
  const customer = await Customer.findOne({
    contacts: {
      $elemMatch: {
        type: "email",
        value: payload.key,
      },
    },
  });
  let customerToken;

  if (customer) {
    customerToken = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1hr",
    });
    return res.json({ customer, token: customerToken });
  }


  const newCustomer = await Customer.create({
    contacts: [{ type: "email", value: payload.key }],
  });

  customerToken = jwt.sign({ id: newCustomer._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1hr",
  });

  return res.json({ customer: newCustomer, token: customerToken });
};

exports.newTicket = async (req, res) => {
  try {
    const { subjectId, description } = req.body;
    let attachments = [];

    // Validate required fields
    if (!subjectId || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // new ticketId generation logic with ticket number length of 6
    let ticketNumber = undefined;
    try {
      ticketNumber = await generateUniqueTicketNumber();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to generate a unique ticket number" });
    }

    const subject = (await findRecursive(subjectId, TicketSubject)) || "";

    if (req.files && req.files.length > 0) {
      // If attachments are provided, add them to the ticket description
      attachments = req.files.map((file) => {
        return path
          .relative(path.resolve(__dirname, ".."), file.path)
          .replace(/\\/g, "/");
      });
    }

    const subjectDepartment = await TicketSubject.findById(subjectId);

    // Create a new ticket
    const newTicket = new Ticket({
      customerId: req.user._id,
      ticketId: ticketNumber,
      source: "Email",
      departmentId: subjectDepartment.departmentId,
      subjectId,
      subject,
      description,
      attachments,
      statusHistory: [
        {
          status: "open",
          timestamp: new Date(),
          comments: "Ticket created",
        },
      ],
    });

    // Save the ticket to the database
    await newTicket.save();

    const customer = await Customers.findById(req.user._id);
    customer.tickets = [...customer.tickets, newTicket._id];
    await customer.save();

    const customerContact = customer.contacts.find((contact) => contact.type == 'email')
    let messageId = ""
    if (customerContact) {
      const mailContent = newTicketTemplate(ticketNumber, subject)
      const mail = await transporter.sendMail({ ...mailOptions, to: customerContact.value, subject: mailContent.subject, text: mailContent.body })
      messageId = mail.messageId
    }
    newTicket.messages.push({
      message: description,
      messageId,
      messageType: "email",
      senderType: "customer",
      attachments
    })
    await newTicket.save()
    return res
      .status(201)
      .json({ message: "Ticket created successfully", ticket: newTicket });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
