import UserModel from "../models/user-model.js";
import ErrorHandlerService from "../services/error-handler-service.js";

class ProfileController {
  async getProfiles(req, res, next) {
    const {
      religion,
      minAge,
      maxAge,
      maritialStatus,
      height,
      weight,
      smooking,
      drinking,
      food,
    } = req.query;

    const oppositeGender = req.userData.gender === "Male" ? "Female" : "Male";

    let query = {
      _id: { $ne: req.userData._id },
      gender: oppositeGender,
      isActivated: true,
    };

    if (religion !== undefined && religion !== "") {
      query.religion = religion;
    }

    if (maritialStatus !== undefined && maritialStatus !== "") {
      query.maritialStatus = maritialStatus;
    }

    if (height !== undefined && height !== "") {
      query.height = height;
    }

    if (weight !== undefined && weight !== "") {
      query.weight = weight;
    }

    if (smooking !== undefined && smooking !== "") {
      query.smooking = smooking;
    }

    if (drinking !== undefined && drinking !== "") {
      query.drinking = drinking;
    }

    if (food !== undefined && food !== "") {
      query.food = food;
    }

    if (minAge !== undefined && !isNaN(minAge)) {
      query.age = { $gte: parseInt(minAge, 10) };
    }

    if (maxAge !== undefined && !isNaN(maxAge)) {
      query.age = { ...query.age, $lte: parseInt(maxAge, 10) };
    }

    try {
      const profiles = await UserModel.find(query);
      return res.status(200).json({ profiles });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await UserModel.findOne(
        { _id: req.params._id },
        "-password -likedProfiles"
      );
      if (!profile) {
        return next(ErrorHandlerService.notFound());
      }
      return res.status(200).json({ profile });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProfileController();
