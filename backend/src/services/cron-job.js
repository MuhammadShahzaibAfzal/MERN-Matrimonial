// cronJob.js
import cron from "node-cron";
import { checkExpiredSubscriptions } from "./subscripion-service.js";

// Run the checkExpiredSubscriptions function every day at midnight
const scheduledTask = cron.schedule("0 0 * * *", () => {
  console.log("====================================");
  console.log("Cron job run");
  console.log("====================================");
  checkExpiredSubscriptions();
});

// Start the cron job
scheduledTask.start();

export { scheduledTask };
