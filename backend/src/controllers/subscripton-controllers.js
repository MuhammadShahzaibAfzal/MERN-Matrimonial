import SubscriptionModel from "../models/subscription-model.js";
import UserModel from "../models/user-model.js";
import ErrorHandlerService from "../services/error-handler-service.js";

class SubscriptionController {
  async createSubscription(req, res, next) {
    const { plan } = req.body;
    console.log("====================================");
    console.log(req.body);
    console.log("====================================");
    const userId = req.userData._id;
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return next(ErrorHandlerService.notFound("User not found !"));
      }
      const planMonths = {
        Silver: 1,
        Gold: 3,
        Platinum: 6,
      };
      // check user is already member or not
      const isMember = await SubscriptionModel.findOne({
        userId: userId,
        status: "active",
      });
      if (isMember) {
        return next(
          ErrorHandlerService.badRequest(
            `You have already purchased the ${
              isMember.plan
            } plan. subscription started on ${isMember.startDate.toDateString()}.It is valid until ${isMember.endDate.toDateString()}.`
          )
        );
      }
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + planMonths[plan]);
      const newSubscription = new SubscriptionModel({
        userId,
        endDate,
        ...req.body,
      });
      await newSubscription.save();

      // Update user Role
      user.role = "Member";
      await user.save();

      return res
        .status(201)
        .json({ message: "Subscription created successfully.", user: user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new SubscriptionController();
