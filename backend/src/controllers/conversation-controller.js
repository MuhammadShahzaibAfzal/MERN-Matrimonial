import ConversationModel from "../models/conversation-model.js";

class ConversationController {
  // new conversation
  async createConversation(req, res, next) {
    const { receiverId } = req.body;
    try {
      const existingConversation = await ConversationModel.findOne({
        members: {
          $all: [req.userData._id, receiverId],
        },
      });
      if (existingConversation) {
        return res.status(200).json({
          message: "Conversation already exists!",
          conversation: existingConversation,
        });
      }
      const newConversation = await ConversationModel.create({
        members: [req.userData._id, receiverId], // because user must be login so sender ID i get from req.userData
      });
      res.status(201).json({
        message: "Conversation created successfully !",
        conversation: newConversation,
      });
    } catch (error) {
      next(error);
    }
  }
  //   get conversation of user

  async getConversations(req, res, next) {
    try {
      const conversations = await ConversationModel.find({
        members: {
          $in: [req.userData?._id],
        },
      });
      res.status(200).json({ conversations });
    } catch (error) {
      next(error);
    }
  }
}

export default new ConversationController();
