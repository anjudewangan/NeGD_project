const mongoose = require('mongoose');

const ivrQueueSchema = new mongoose.Schema({
  queueName: {
    type: String,
    required: true,
  },
  queueNumber: {
    type: String,
    required: true,
    index: true,
  },
}, { timestamps: true });

const IvrQueue = mongoose.model('IvrQueue', ivrQueueSchema);
module.exports = IvrQueue;