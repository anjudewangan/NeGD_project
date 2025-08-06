const path = require("path");
const mongoose = require("mongoose");
const Ticket = require("../models/Tickets");
const TicketSubject = require("../models/TicketSubject");
const { findRecursive, generateUniqueTicketNumber } = require("../utils/utils");
const { getRecentCallForAgent } = require("../utils/wave/getRecentCall");
const Tickets = require("../models/Tickets");
const Agents = require("../models/Agents")
const { transporter, mailOptions } = require("../utils/mail")

exports.createNewTicket = async (req, res) => {
  try {
    const { source, subjectId, description, priority, alternateMobile } =
      req.body;
    let mobile;
    let attachments = [];

    // Validate required fields
    if (!source || !subjectId || !description) {
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
    let recentCall = await getRecentCallForAgent(req.agent.extensionCode);
    recentCall = recentCall.slice(-1)[0];

    // console.log("Recent Call: ", recentCall.slice(-1)[0]);

    if (recentCall.disposition === "ANSWERED") {
      mobile = recentCall.src.slice(3);
    }

    if (req.files && req.files.length > 0) {
      // If attachments are provided, add them to the ticket description
      attachments = req.files.map((file) => {
        return path
          .relative(path.resolve(__dirname, ".."), file.path)
          .replace(/\\/g, "/");
      });
    }

    // Create a new ticket
    const newTicket = new Ticket({
      ticketId: ticketNumber,
      source,
      agentId: req.agent._id,
      departmentId: req.agent.departmentId,
      subjectId,
      subject,
      mobile,
      alternateMobile,
      description,
      priority,
      statusHistory: [
        {
          status: "open",
          updatedBy: req.agent._id,
          timestamp: new Date(),
          comments: "Ticket created",
        },
      ],
      attachments,
    });

    // Save the ticket to the database
    await newTicket.save();

    return res
      .status(201)
      .json({ message: "Ticket created successfully", ticket: newTicket });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateTicket = async (req, res) => {
  const { ticketId } = req.params;
  const { status, remarks } = req.body;

  if (!status || !ticketId) {
    throw Error(`Status and TicketId are required`);
  }

  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw Error(`Ticket not found with ID: ${ticketId}`);
  }

  const ticketStatus = {
    status,
    comments: remarks || "",
    updatedBy: req.agent._id,
  };

  ticket.statusHistory = [...ticket.statusHistory, ticketStatus];

  await ticket.save();
  return res.send("Ticket Updated");
};

exports.getPendingTickets = async (req, res) => {
  const role = req.agent.role;

  const query = [
    {
      $match: {
        $expr: {
          $eq: [
            {
              $arrayElemAt: ["$statusHistory.status", -1],
            },
            "open",
          ],
        },
      },
    },
    {
      $project: {
        ticketId: 1,
        subject: 1,
        agentId: 1,
        source: 1,
        priority: 1,
        mobile: {
          $cond: {
            if: { $or: [{ $ne: ["$mobile", null] }, { $ne: ["$mobile", ""] }] },
            then: "$mobile",
            else: {
              $concat: [
                "XXXXXX",
                {
                  $substr: [
                    "$mobile",
                    { $subtract: [{ $strLenCP: "$mobile" }, 4] },
                    4
                  ]
                }
              ]
            }
          }
        },
        statusHistory: 1,
        createdAt: 1,
      },
    },
  ];

  if (role === "agent") {
    Object.assign(query[0]["$match"], {
      agentId: new mongoose.Types.ObjectId(req.agent._id),
    });
  }

  const tickets = await Ticket.aggregate(query);

  return res.json(tickets);
};

exports.getTicket = async (req, res) => {
  const { ticketNo } = req.query;

  if (!ticketNo) {
    return res.status(400).send("Ticket number is required");
  }

  const ticket = await Ticket.findOne({ ticketId: ticketNo });

  if (!ticket) {
    return res.status(404).send("Ticket Not Found.");
  }

  return res.json(ticket);
};

exports.assignTicket = async (req, res) => {
  const { assignToAgentId, ticketId } = req.body
  const agentId = req.agent._id

  const agents = await Agents.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(agentId) }
    },
    {
      $graphLookup: {
        from: 'agents',
        startWith: '$_id',
        connectFromField: '_id',
        connectToField: 'managedBy',
        as: "subAgents"
      }
    },
    {
      $project: {
        _id: 0,
        subAgents: 1
      }
    },
    { $unwind: "$subAgents" },
    {
      $replaceRoot: { newRoot: "$subAgents" }
    }
  ])

  // check if assigned agent is managed by agent.

  const isManaged = agents.some(agent => agent._id.toString() === assignToAgentId)

  if (!isManaged) {
    return res.status(403).json({ message: "You does't manage the given agent" })
  }

  // assign the agent to the ticket
  const ticket = await Tickets.findByIdAndUpdate(ticketId, { agentId: assignToAgentId })

  return res.json(ticket)

}

exports.sendMessageForTicket = async (req, res) => {
  const { ticketId, message } = req.body
  const { _id: agentId, role } = req.agent
  const query = { _id: ticketId }

  if (role === 'agent') {
    Object.assign(agentId)
  }

  const ticket = await Tickets.findOne(query).populate("customerId")
  if (!ticket) {
    return res.status(404).json({ message: `Ticket with id of ${ticketId} doesn't exists or doesn't belong to the agent` })
  }

  const latestTicketMessageId = (ticket.messages || []).filter(message => message.messageType == 'email').sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  )[0].messageId;

  let attachments = []
  if (req.files && req.files.length > 0) {
    // If attachments are provided, add them to the ticket description
    attachments = req.files.map((file) => {
      return path
        .relative(path.resolve(__dirname, ".."), file.path)
        .replace(/\\/g, "/");
    });
  }


  const customerEmail = ticket.customerId.contacts.find(contact => contact.type == 'email').value
  let messageId = ''

  if (customerEmail) {
    const email = await transporter.sendMail({ ...mailOptions, to: customerEmail, subject: `RE: Ticket #${ticket.ticketId} ${ticket.subject}`, html: message })
    messageId = email.messageId
    console.log(email)
  }

  ticket.messages.push({ message, messageType: "email", messageId, senderType: "agent", agentId, attachments, isHtml: true })
  await ticket.save()

  return res.send("Message sent")
}

exports.getAllTickets = async (req, res) => {
  const departmentId = req.agent.departmentId

  const tickets = await Tickets.find({ departmentId })

  return res.json(tickets)
}

exports.getMessages = async (req, res) => {
  const { ticketId } = req.params
  const { role, _id: agentId } = req.agent
  console.log(role, agentId, ticketId)
  const query = [{
    $match: { _id: new mongoose.Types.ObjectId(ticketId) }
  }, {
    $project: {
      messages: { $sortArray: { input: "$messages", sortBy: { timestamp: -1 } } }
    }
  }]

  if (role === 'agent') {
    Object.assign(query[0]['$match'], { agentId })
  }

  const ticketMessages = await Tickets.aggregate(query)

  if (ticketMessages.length === 0) {
    return res.status(404).json({ message: "No Ticket Found" })
  }

  return res.json(ticketMessages[0])
}

exports.ticketInfo = async (req, res) => {
  const { ticketId } = req.params
  const { role, _id: agentId } = req.agent

  const query = [{
    $match: { _id: new mongoose.Types.ObjectId(ticketId) }
  }, {
    $project: {
      messages: 0,
      attachments: 0,
      statusHistory: 0
    }
  }]

  if (role === 'agent') {
    Object.assign(query[0]['$match'], { agentId })
  }

  const ticketMessages = await Tickets.aggregate(query)

  if (ticketMessages.length === 0) {
    return res.status(404).json({ message: "No Ticket Found" })
  }

  return res.json(ticketMessages[0])
}