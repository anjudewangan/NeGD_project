const { CronJob } = require("cron");
const { waveLogin } = require("../utils/waveLoginUtils");

const waveCookieJob = new CronJob("*/1 * * * *", waveLogin);

module.exports = waveCookieJob
