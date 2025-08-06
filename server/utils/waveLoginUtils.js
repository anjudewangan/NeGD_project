const axios = require("axios");
const https = require("https");
const crypto = require("crypto");
const logger = require("./logger");

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const cookie = {value: null}
/**
 * get the challenge from wave server for login
 */
async function getChallenge () {
  try {
    const response = await axios.post(
      process.env.WAVE_API,
      {
        request: {
          action: "challenge",
          user: process.env.WAVE_USER,
        },
      },
      { httpsAgent }
    );
    return response.data.response.challenge;
  } catch (error) {
    throw Error("Error getting challenge from Wave server");
  }
};

/**
 *
 * @param {String} challenge challenge received from getChallenge function
 * @returns verification cookie
 *
 */
async function getVerificationCookie(challenge) {
  try {
    const hashPassword = crypto
      .createHash("md5")
      .update(`${challenge}${process.env.WAVE_USER_PASSWORD}`)
      .digest("hex");
    const response = await axios.post(
      process.env.WAVE_API,
      {
        request: {
          action: "login",
          token: hashPassword,
          url: `http://${process.env.PRIVATE_IP}`,
          user: process.env.WAVE_USER,
        },
      },
      { httpsAgent }
    );
    if (response.data.status !== 0) {
      throw Error(`${response.data.status}`);
    }
    return response.data.response.cookie;
  } catch (error) {
    throw Error("Error fetching cookie", { error: error.message });
  }
}

/**
 * set the cookie for api query using wave server.
 */
async function waveLogin() {
  const challenge = await getChallenge();
  const cookieData = await getVerificationCookie(challenge);
  cookie.value = cookieData;
  logger.info("Wave login successful", { cookie });
}

module.exports = {
  cookie,
  getChallenge,
  getVerificationCookie,
  waveLogin
}