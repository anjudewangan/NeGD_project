const { Server } = require("socket.io");
const { setupAgentNamespace } = require("./agentNamespace");
// In the future: const setupAdminNamespace = require('./adminNamespace');

function setupWebSockets(server) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  setupAgentNamespace(io.of("/agent"));

  // For future namespaces:
  // setupAdminNamespace(io.of('/admin'));

  return io;
}

module.exports = setupWebSockets;
