const axios = require('axios');
const https = require('https');
const { waveLogin, cookie } = require('./waveLoginUtils');

const axiosInstance = axios.create({
  baseURL: process.env.WAVE_API,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

module.exports = axiosInstance;