import { Router } from "express";
import authControllers from "../controllers/auth-controllers.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import profileControllers from "../controllers/profile-controllers.js";
import likeControllers from "../controllers/like-controllers.js";
import subscriptonControllers from "../controllers/subscripton-controllers.js";
import conversationController from "../controllers/conversation-controller.js";
import messageController from "../controllers/message-controller.js";
import userControllers from "../controllers/user-controllers.js";
import adminMiddleware from "../middlewares/admin-middleware.js";

const router = Router();

/* REGISTER ROUES */
router.post("/personal-details", authControllers.savePersonalDetails);
router.post(
  "/educational-details",
  authMiddleware,
  authControllers.saveEducationDetails
);

router.post(
  "/occupational-details",
  authMiddleware,
  authControllers.saveOccupationalDetails
);

router.post(
  "/family-details",
  authMiddleware,
  authControllers.saveFamilyDetails
);

router.post(
  "/additonal-personal-details",
  authMiddleware,
  authControllers.saveAdditionalPersonalDetails
);

router.post(
  "/desired-profile-details",
  authMiddleware,
  authControllers.saveDesiredProfileDetails
);

router.post("/login", authControllers.login);
router.get("/refresh-tokens", authControllers.refreshTokens);
router.post("/change-password", authMiddleware, authControllers.changePassword);
router.post("/forget-password", authControllers.forgetPassword);
router.post("/reset-password", authControllers.resetPassword);
router.get("/logout", authControllers.logout);

router.get("/get-profiles", authMiddleware, profileControllers.getProfiles);
router.get("/get-profiles/:_id", authMiddleware, profileControllers.getProfile);

router.post("/like-profile", authMiddleware, likeControllers.likeProfile);
router.get("/liked-profiles", authMiddleware, likeControllers.getLikedProfiles);
router.post("/unlike-profile", authMiddleware, likeControllers.unLikeProfile);

router.post(
  "/create-subscription",
  authMiddleware,
  subscriptonControllers.createSubscription
);

/* CONVERSATION */
router.post(
  "/create-conversation/",
  authMiddleware,
  conversationController.createConversation
);

router.get(
  "/conversations",
  authMiddleware,
  conversationController.getConversations
);
/* MESSAGE */

router.post("/create-message/", authMiddleware, messageController.addMessage);

router.get("/messages/:_id", authMiddleware, messageController.getMessages);

router.get("/users/:_id", userControllers.getUser);

router.get(
  "/registerd-users",
  authMiddleware,
  adminMiddleware,
  userControllers.getRegisterdUsers
);

router.get(
  "/paid-users",
  authMiddleware,
  adminMiddleware,
  userControllers.getPaidUsers
);
router.get(
  "/admin-home",
  authMiddleware,
  adminMiddleware,
  userControllers.getDashbaordHomeData
);

router.put(
  "/update-profile/:_id",
  authMiddleware,
  authControllers.updateProfile
);

export default router;
