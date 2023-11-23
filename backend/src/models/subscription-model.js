import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  plan: {
    type: String,
    enum: ["Silver", "Gold", "Platinum"],
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "canceled"],
    default: "active",
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },

  cardHolderName: String,
  cardNumber: String,
  expirationDate: String,
  cvv: String,
  bankName: String,
  IFSCCode: String,
  accountNo: String,
  customerID: String,
});

const SubscriptionModel = mongoose.model("Subscription", subscriptionSchema);

export default SubscriptionModel;
