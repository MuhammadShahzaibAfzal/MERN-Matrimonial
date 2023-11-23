import SubscriptionModel from "../models/subscription-model.js";
import UserModel from "../models/user-model.js";
import ErrorHandlerService from "../services/error-handler-service.js";

class UserController {
  async getUser(req, res, next) {
    // logic
    try {
      const user = await UserModel.findById(
        req.params._id,
        "_id firstName lastName imagePath"
      );
      if (!user) {
        return next(ErrorHandlerService.notFound());
      }
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }

  async getRegisterdUsers(req, res, next) {
    try {
      const users = await UserModel.find({ role: "User" });
      return res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  }

  async getPaidUsers(req, res, next) {
    try {
      const users = await SubscriptionModel.find({ status: "active" }).populate(
        "userId"
      );
      return res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  }

  async getDashbaordHomeData(req, res, next) {
    try {
      const newRegisterdUsers = await UserModel.find({ role: "User" })
        .sort({ createdAt: -1 })
        .limit(5);
      const newPaidUsers = await UserModel.find({ role: "Member" })
        .sort({ createdAt: -1 })
        .limit(5);
      const totalRegisterdUsers = await UserModel.countDocuments();
      const totalFreeUsers = await UserModel.countDocuments({ role: "User" });
      const totalPaidUsers = await UserModel.countDocuments({ role: "Member" });
      return res.status(200).json({
        newRegisterdUsers,
        newPaidUsers,
        totalFreeUsers,
        totalRegisterdUsers,
        totalPaidUsers,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
