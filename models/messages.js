const mongoose = require('mongoose');
const messageSchema = require('../schemas/messages');

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;