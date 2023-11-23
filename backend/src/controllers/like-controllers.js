import UserModel from "../models/user-model.js";
import ErrorHandlerService from "../services/error-handler-service.js";

class LikeControllers {
  async getLikedProfiles(req, res, next) {
    const userId = req.userData._id;
    try {
      // Get the user's liked profiles
      const user = await UserModel.findById(userId).populate("likedProfiles");
      const likedProfiles = user.likedProfiles;

      return res.status(200).json({ likedProfiles });
    } catch (error) {
      next(error);
    }
  }

  async likeProfile(req, res, next) {
    // only authenticated user
    // validate request (profileID is required)
    // get profile id from req.body
    // validate profile
    // already liked or not
    // add into array
    // send response
    const { profileId } = req.body;
    if (!profileId) {
      return next(
        ErrorHandlerService.validationError("Profile Id is required !")
      );
    }
    try {
      const isExist = await UserModel.findOne({ _id: profileId });
      if (!isExist) {
        return next(ErrorHandlerService.notFound("Profile not found !"));
      }

      // Check if the user has already liked the profile
      const user = await UserModel.findById(req.userData._id);
      if (!user) {
        return next(ErrorHandlerService.notFound("User not found !"));
      }
      if (user.likedProfiles.includes(profileId)) {
        return next(
          ErrorHandlerService.badRequest("You have already liked this profile.")
        );
      }
      // Add the profileId to the likedProfiles list
      user.likedProfiles.push(profileId);
      await user.save();

      return res
        .status(200)
        .json({
          message: "Profile liked successfully.",
          likedProfiles: user.likedProfiles,
        });
    } catch (error) {
      next(error);
    }
  }

  async unLikeProfile(req, res, next) {
    const { profileId } = req.body;
    const userId = req.userData._id;
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return next(ErrorHandlerService.notFound("User not found !"));
      }

      // Check if the user has liked the profile
      if (!user.likedProfiles.includes(profileId)) {
        return next(
          ErrorHandlerService.badRequest("You have not liked this profile.")
        );
      }

      // Remove the profileId from the likedProfiles list
      user.likedProfiles = user.likedProfiles.filter(
        (id) => id.toString() !== profileId
      );
      await user.save();

      return res.status(200).json({
        message: "Profile unliked successfully.",
        likedProfiles: user.likedProfiles,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new LikeControllers();

// controllers/unlikeController.js
