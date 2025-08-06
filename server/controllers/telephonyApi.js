const axiosInstance = require("../utils/axiosClient");
const { cookie } = require("../utils/waveLoginUtils");
const logger = require("../utils/logger");
const Tickets = require("../models/Tickets");

exports.fetchActiveCallForAgent = async (req, res) => {
  // fetch active call for agent using extensionId of agent
  const extensionCode = req.agent.extensionCode;
  if (!extensionCode) {
    return res.status(400).json({ message: "Extension ID is required" });
  }

  const response = await axiosInstance.post("/", {
    request: {
      action: "listBridgedChannels",
      cookie: cookie.value,
    },
  });
  if (response.data.status !== 0) {
    throw Error(
      `Error fetching Bridged Calls. Error Code: ${response.data.status}`
    );
  }

  const activeCalls = response.data.response.channel.filter(
    (call) =>
      call.callerid2 === extensionCode || call.callerid1 === extensionCode
  );

  const callerNumber = activeCalls.map((call) => {
    return call.callerid1 === extensionCode ? call.callerid2 : call.callerid1;
  });

  if (activeCalls.length === 0) {
    return res.status(404).json({ message: "No active calls found" });
  }

  res.status(200).json(callerNumber);
};

exports.dialOutbound = async (req, res) => {
  const { number } = req.body;
  const extensionCode = req.agent.extensionCode;
  if (!extensionCode) {
    return res.status(400).json({ message: "Extension ID is required" });
  }
  if (!number) {
    return res.status(400).json({ message: "Number is required" });
  }

  const response = await axiosInstance.post("/", {
    request: {
      action: "dialOutbound",
      cookie: cookie.value,
      outbound: number,
      caller: extensionCode,
    },
  });

  if (response.data.status !== 0) {
    logger.error(
      `Error dialing outbound. Error Code: ${response.data.status}. Error Message: ${response.data.message}`
    );
    return res
      .status(500)
      .json({ message: "Error dialing outbound", error: response.data });
  }

  res.status(200).json({ message: "Dialing outbound", data: response.data });
};

exports.activeCalls = async (req, res) => {
  const response = await axiosInstance.post("/", {
    request: {
      action: "listBridgedChannels",
      cookie: cookie.value,
    },
  });
  if (response.data.status !== 0) {
    throw Error(
      `Error fetching Bridged Calls. Error Code: ${response.data.status}`
    );
  }

  res.status(200).json(response.data.response);
};

exports.dialOutboundTicketId = async (req, res) => {
  const { ticketId } = req.body;
  let ticket;
  try {
    ticket = await Tickets.findById(ticketId);
  } catch (error) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  const extensionCode = req.agent.extensionCode;
  if (!extensionCode) {
    return res.status(400).json({ message: "Extension ID is required" });
  }
  if (!ticket.mobile) {
    return res.status(400).json({ message: "Number is required" });
  }

  const response = await axiosInstance.post("/", {
    request: {
      action: "dialOutbound",
      cookie: cookie.value,
      outbound: `0${ticket.mobile}`,
      caller: extensionCode,
    },
  });

  if (response.data.status !== 0) {
    logger.error(
      `Error dialing outbound. Error Code: ${response.data.status}. Error Message: ${response.data.message}`
    );
    return res
      .status(500)
      .json({ message: "Error dialing outbound", error: response.data });
  }

  res.status(200).json({ message: "Dialing outbound", data: response.data });
};

exports.liveCalls = async (req, res) => {
  const brigedCalls = axiosInstance.post("/", {
    request: {
      action: "listBridgedChannels",
      cookie: cookie.value,
    },
  });

  const unBrigedCalls = axiosInstance.post("/", {
    request: {
      action: "listUnBridgedChannels",
      cookie: cookie.value,
    },
  });

  const [brigedCallsResponse, unBrigedCallsResponse] = await Promise.all([brigedCalls, unBrigedCalls])

  const calls = []

  brigedCallsResponse.data.response?.channel?.forEach(call => {
    calls.push({ ...call })
  })

  unBrigedCallsResponse.data.response?.channel?.forEach(call => {
    calls.push({ ...extractCallerDetails(call) })
  })

  // extract the the caller and calle from the calls

  return res.json({ calls })
}

function extractCallerDetails(call) {
  console.log(call)
  const callerid1 = call.callerid1
  const channel1 = call.channel1
  const callerid2 = call.callerid2
  const channel2 = call.channel2

  const returnObject = {}

  const regex = /^\d{11}$/

  const matchCaller = regex.test(callerid1)

  if (matchCaller) {
    Object.assign(returnObject, { customerMobile: callerid1, customerChannel: channel1 })
    Object.assign(returnObject, { agentExtension: callerid2, agentExtension: channel2 })
  } else {
    Object.assign(returnObject, { customerMobile: callerid2, customerChannel: channel2 })
    Object.assign(returnObject, { agentExtension: callerid1, agentExtension: channel2 })
  }

  if (call.bridge_id) {
    Object.assign(returnObject, { callStatus: "Active", brigedId: call.bridge_id })
  } else {
    Object.assign(returnObject, { callStatus: "Ringing" })
  }

  if (call.state === "Ringing") {
    Object.assign(returnObject, { customerMobile: call.callernum })
    Object.assign(returnObject, { agentExtension: call.connectednum })
  }

  if (call.inbound_trunk_name) {
    Object.assign(returnObject, { callType: 'Inbound' })
  } else {
    Object.assign(returnObject, { callType: 'Outbound' })
  }

  return returnObject
}