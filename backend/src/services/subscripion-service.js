import SubscriptionModel from "../models/subscription-model.js";
import UserModel from "../models/user-model.js";

const checkExpiredSubscriptions = async () => {
  try {
    const currentDateTime = new Date();

    // Find subscriptions that have expired
    const expiredSubscriptions = await SubscriptionModel.find({
      status: "active",
      endDate: { $lte: currentDateTime },
    });

    // Update the status of expired subscriptions to 'canceled' and user role to 'User'
    await Promise.all(
      expiredSubscriptions.map(async (subscription) => {
        subscription.status = "canceled";
        await subscription.save();

        // Update user role to 'User'
        await UserModel.findByIdAndUpdate(subscription.userId, {
          role: "User",
        });

        console.log(
          `Subscription for user ${subscription.userId} has expired. User role changed to 'User'.`
        );
        // You can send notifications or take other actions here
      })
    );
  } catch (error) {
    console.error("Error checking and updating expired subscriptions:", error);
  }
};

export { checkExpiredSubscriptions };
