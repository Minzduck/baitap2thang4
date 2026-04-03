const express = require('express');
const router = express.Router();
const Message = require('../models/messages');
const { checkLogin } = require('../utils/authHandler');

// GET /:userID - Lấy toàn bộ messages giữa current user và userID
router.get('/:userID', checkLogin, async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const targetUserId = req.params.userID;

    const messages = await Message.find({
      $or: [
        { from: currentUserId, to: targetUserId },
        { from: targetUserId, to: currentUserId }
      ]
    }).sort({ createdAt: 1 }).populate('from', 'username').populate('to', 'username');

    res.send(messages);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// POST / - Gửi message
router.post('/', checkLogin, async (req, res) => {
  try {
    const { to, messageContent } = req.body;
    const from = req.user._id;

    const newMessage = new Message({
      from,
      to,
      messageContent
    });

    await newMessage.save();
    res.send(newMessage);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET / - Lấy message cuối cùng của mỗi user mà user hiện tại nhắn tin hoặc user khác nhắn cho user hiện tại
router.get('/', checkLogin, async (req, res) => {
  try {
    const currentUserId = req.user._id;

    // Tìm tất cả users đã chat với current user
    const usersChatted = await Message.distinct('from', { to: currentUserId });
    const usersReceived = await Message.distinct('to', { from: currentUserId });
    const allUsers = [...new Set([...usersChatted, ...usersReceived])];

    const lastMessages = [];

    for (const userId of allUsers) {
      const lastMessage = await Message.findOne({
        $or: [
          { from: currentUserId, to: userId },
          { from: userId, to: currentUserId }
        ]
      }).sort({ createdAt: -1 }).populate('from', 'username').populate('to', 'username');

      if (lastMessage) {
        lastMessages.push(lastMessage);
      }
    }

    res.send(lastMessages);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;