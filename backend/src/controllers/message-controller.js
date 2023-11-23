import MessageModel from "../models/message-model.js";

class MessageController {
  // add
  async addMessage(req, res, next) {
    const { conversationId, text } = req.body;
    try {
      const saveMessage = await MessageModel.create({
        conversationId,
        senderId: req.userData._id,
        text,
      });
      return res.status(200).json({ saveMessage });
    } catch (error) {
      next(error);
    }
  }

  //   get
  async getMessages(req, res, next) {
    const { _id } = req.params;
    try {
      const messages = await MessageModel.find({
        conversationId: _id,
      });
      return res.status(200).json({ messages });
    } catch (error) {
      next(error);
    }
  }
}

export default new MessageController();
