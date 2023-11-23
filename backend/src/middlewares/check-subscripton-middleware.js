import SubscriptionModel from "../models/subscription-model.js";
import ErrorHandlerService from "../services/error-handler-service.js";

const checkSubscription = async (req, res, next) => {
  const userId = req.userData._id;
  try {
    const activeSubscription = await SubscriptionModel.findOne({
      userId,
      status: "active",
      endDate: { $gt: new Date() }, // Check if the subscription is still valid
    });

    if (activeSubscription) {
      // User has an active subscription
      req.subscription = activeSubscription;
      next();
    } else {
      // User does not have an active subscription
      next(
        ErrorHandlerService.forbidden("You do not have an active subscription.")
      );
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default checkSubscription;
