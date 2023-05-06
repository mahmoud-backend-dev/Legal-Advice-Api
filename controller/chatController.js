const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const { BadRequest } = require('../errors');
const Chat = require('../models/Chat');

// @decs Add Comment To Post
// @route POST /api/v1/chat/:id
// @ptotect Protected/User
exports.getUserMessages = asyncHandler(async (req, res) => {
  const messages = await Chat.findOne({sender:req.params.id,recipient:''})
})