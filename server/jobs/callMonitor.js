const { CronJob } = require("cron");

const Agent = require('../models/Agents');
const IvrQueue = require("../models/IvrQueue");
const { sendUpdateToAgent } = require("../sockets/agentNamespace");
const axiosInstance = require("../utils/axiosClient");
const { cookie } = require("../utils/waveLoginUtils");

async function fetchLiveCallsFromUCM() {
  // Replace with actual UCM API
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
  const calls = response.data.response.channel.map((call) => {
    const regex = /^\d{4}$/g;
    const extension = call.callerid1.match(regex)
      ? maskMobileNumber(call.callerid1)
      : maskMobileNumber(call.callerid2);
    const client = call.callerid1.match(regex)
      ? maskMobileNumber(call.callerid2)
      : maskMobileNumber(call.callerid1);
    return {
      extension,
      client,
      ...call,
    };
  });
  return calls;
}

async function monitorCallsAndNotifyAgents() {
  try {
    const [calls, agents, queue] = await Promise.all([
      fetchLiveCallsFromUCM(),
      Agent.find({}),
      IvrQueue.find({}),
    ]);

    const extensionSet = new Set(agents.map((a) => a.extensionCode));
    const callMap = new Map(calls.map((call) => [call.extension, call]));
    const queueMap = new Map(queue.map((q) => [q.queueNumber, q.queueName]));

    // live calls
    // console.log('Live Calls:', calls.channel);

    extensionSet.forEach((ext) => {
      const call = callMap.get(ext);
      if (call) {
        sendUpdateToAgent(ext, {
          ...call,
          queueName: queueMap.get(call.feature_calleenum) || null,
        });
      } else {
        sendUpdateToAgent(ext, {
          extension: ext,
          client: null,
        });
      }
    });
  } catch (err) {
    console.error("Error in monitoring calls:", { error: err.message, cookie });
  }
}

function maskMobileNumber(mobileNumber) {
  if (mobileNumber.length < 4) {
    return mobileNumber;
  }
  const maskedNumber =
    mobileNumber.slice(0, -4).replace(/\d/g, "*") + mobileNumber.slice(-4);
  return maskedNumber;
}

const callMonitorJob = new CronJob("*/5 * * * * *", monitorCallsAndNotifyAgents);
module.exports = callMonitorJob;
