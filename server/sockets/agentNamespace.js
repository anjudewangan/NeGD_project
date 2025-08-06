require('../env')
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET
const connectedAgents = new Map();

function setupAgentNamespace(agentNamespace) {
  agentNamespace.use((socket, next) => {
    const token = socket.handshake.headers?.token;
    if (!token) return next(new Error('Token required'));

    try {
      const payload = jwt.verify(token, SECRET_KEY);
      socket.agentExtension = payload.extensionCode;
      next();
    } catch (err) {
      next(new Error('Invalid token'));
    }
  });

  agentNamespace.on('connection', (socket) => {
    const ext = socket.agentExtension;
    connectedAgents.set(ext, socket);
    console.log(`Agent connected on /agent: ${ext}`);

    socket.on('disconnect', () => {
      connectedAgents.delete(ext);
      console.log(`Agent disconnected from /agent: ${ext}`);
    });
  });
}

function sendUpdateToAgent(extension, data) {
  const socket = connectedAgents.get(extension);
  if (socket) {
    socket.emit('callUpdate', data);
  }
}

module.exports = {
  setupAgentNamespace,
  sendUpdateToAgent,
};
