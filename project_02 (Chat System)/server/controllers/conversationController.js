const Conversation = require('../models/conversation.js');

exports.createConversation = async (req, res) => {
  const conversation = await Conversation.create({
    members: [req.body.senderId, req.body.receiverId],
  });

  res.status(201).json(conversation);
};

exports.getUserConversations = async (req, res) => {
  const conversations = await Conversation.find({
    members: { $in: [req.params.userId] },
  });

  res.json(conversations);
};
