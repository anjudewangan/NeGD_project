const axiosInstance = require("../axiosClient");
const { cookie } = require("../waveLoginUtils");

const getRecentCallForAgent = async (extension) => {
  // date format "YYYY-MM-DDTHH:mm"
  const formattedDate = new Date().toISOString().slice(0, 10);
  const response = await axiosInstance.post("/", {
    request: {
      action: "cdrapi",
      format: "json",
      cookie: cookie.value,
      startTime: `${formattedDate}T00:00`,
      endTime: `${formattedDate}T23:59`,
      callee: extension,
    },
  });
  return response.data.response.cdr_root;
};

module.exports = {
    getRecentCallForAgent,
}