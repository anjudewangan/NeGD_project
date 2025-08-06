require('./env')
require("./startJobs");
const mongoose = require("mongoose");
const http = require("http");
const { app: expressApp } = require("./expressApp");
const logger = require("./utils/logger");
const { waveLogin } = require("./utils/waveLoginUtils");
const setupWebSockets = require("./sockets");

const server = http.createServer(expressApp);
setupWebSockets(server);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info("MongoDB connected"))
  .catch((error) => logger.error(`MongoDB connection error: ${error.message}`));

server.listen(process.env.PORT || 3000, () => {
  logger.info(`Server is running on port ${process.env.PORT || 3000}`);
  waveLogin().catch((error) =>
    logger.error(`Wave login failed: ${error.message}`)
  );
});