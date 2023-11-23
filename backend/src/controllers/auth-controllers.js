import UserModel from "../models/user-model.js";
import ErrorHandlerService from "../services/error-handler-service.js";
import handleMultipartData from "../services/multer-service.js";
import bcrypt from "bcrypt";
import tokenService from "../services/token-service.js";
import sendMail from "../services/email-service.js";
import { FRONTEND_BASE_URL } from "../config/index.js";

class AuthController {
  /* REGISTRATION STEPS  */
  async savePersonalDetails(req, res, next) {
    handleMultipartData(req, res, async (err) => {
      if (err) {
        return next(
          ErrorHandlerService.badRequest(
            "Something went wrong while uploading profile image"
          )
        );
      }
      const filePath = req.files?.["image"]?.[0]?.path;

      const {
        firstName,
        lastName,
        gender,
        dob,
        age,
        email,
        address1,
        address2,
        city,
        dist,
        phoneNumber,
        pinCode,
        areaCode,
        landLine,
        password,
      } = req.body;
      /* VALIDATATE REQUEST */
      console.log(req.body);
      if (
        !firstName ||
        !lastName ||
        !gender ||
        !dob ||
        !age ||
        !email ||
        !address1 ||
        !city ||
        !dist ||
        !phoneNumber ||
        !pinCode ||
        !areaCode ||
        !landLine ||
        !password
      ) {
        return next(ErrorHandlerService.validationError());
      }

      /* CHECK EMAIL already exist */
      try {
        const isEmailExist = await UserModel.findOne({ email });
        if (isEmailExist) {
          return next(
            ErrorHandlerService.alreadyExist("email is already exist !")
          );
        }
      } catch (error) {
        return next(error);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      /* CREATE USER */
      let user;
      try {
        user = await UserModel.create({
          firstName,
          lastName,
          gender,
          dob,
          age,
          email,
          address1,
          address2,
          city,
          dist,
          phoneNumber,
          pinCode,
          areaCode,
          landLine,
          imagePath: filePath,
          password: hashedPassword,
        });
      } catch (error) {
        return next(error);
      }

      /* GENRATE TOKENS */

      const { accessToken, refreshToken } = await tokenService.genrateTokens({
        _id: user._id,
        role: user.role,
        gender: user.gender,
      });

      /* SAVE REFRESH TOKEN INTO DB OR UPDATE PREVIOUS REFRESH TOKEN OF USER */
      try {
        const isExist = await tokenService.findRefreshToken({ user: user._id });
        if (isExist) {
          /* IF ALREADY EXIST TOKEN INTO DB THEN UPDATE TOKEN */
          await tokenService.updateRefreshToken(
            { user: user._id },
            { token: refreshToken }
          );
        } else {
          /* IF NOT THEN SIMPLY SAVED IT INTO DB */
          await tokenService.saveRefreshToken({
            user: user._id,
            token: refreshToken,
          });
        }
      } catch (error) {
        return next(error);
      }

      /* SET COOKIES  */
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      return res.status(200).json({ isAuth: true, user: user });
    });
  }

  /* ONLY AUTHENTICATED USER  */
  async saveEducationDetails(req, res, next) {
    const { education, institute, additionalInfo, gradutionYear } = req.body;
    /* VALIDATE REQUEST */
    if (!education || !institute || !gradutionYear) {
      return next(ErrorHandlerService.validationError());
    }
    try {
      const user = await UserModel.findOne({ _id: req.userData?._id });
      if (!user) {
        return next(ErrorHandlerService.unAuthorized());
      }

      user.education = education;
      user.institution = institute;
      user.additionalInfo = additionalInfo;
      user.graduationYear = gradutionYear;
      user.activationStep = user.activationStep + 1;

      await user.save();
      return res.status(200).json({ isAuth: true, user: user });
    } catch (error) {
      return next(error);
    }
  }

  /* ONLY AUTHENTICATED USER */
  async saveOccupationalDetails(req, res, next) {
    const { occupation, jobTitle, responsibilities, yearsOfExperience } =
      req.body;
    /* VALIDATE REQUEST */
    if (!occupation || !jobTitle || !responsibilities || !yearsOfExperience) {
      return next(ErrorHandlerService.validationError());
    }
    try {
      const user = await UserModel.findOne({ _id: req.userData?._id });
      if (!user) {
        return next(ErrorHandlerService.unAuthorized());
      }

      user.occupation = occupation;
      user.jobTitle = jobTitle;
      user.responsibilities = responsibilities;
      user.yearsOfExperience = yearsOfExperience;
      user.activationStep = user.activationStep + 1;

      await user.save();
      return res.status(200).json({ isAuth: true, user: user });
    } catch (error) {
      return next(error);
    }
  }

  /* ONLY AUTHENTICATED USER */
  async saveFamilyDetails(req, res, next) {
    const {
      fatherName,
      motherName,
      numberOfBrothers,
      numberOfSisters,
      fatherOccupation,
    } = req.body;
    /* VALIDATE REQUEST */
    if (
      !fatherName ||
      !motherName ||
      !numberOfBrothers ||
      !numberOfSisters ||
      !fatherOccupation
    ) {
      return next(ErrorHandlerService.validationError());
    }
    try {
      const user = await UserModel.findOne({ _id: req.userData?._id });
      if (!user) {
        return next(ErrorHandlerService.unAuthorized());
      }

      user.fatherName = fatherName;
      user.motherName = motherName;
      user.numberOfBrothers = numberOfBrothers;
      user.numberOfSisters = numberOfSisters;
      user.fatherOccupation = fatherOccupation;

      user.activationStep = user.activationStep + 1;

      await user.save();
      return res.status(200).json({ isAuth: true, user: user });
    } catch (error) {
      return next(error);
    }
  }

  /* ONLY AUTHENTICATED USER */
  async saveAdditionalPersonalDetails(req, res, next) {
    const {
      religion,
      cast,
      maritialStatus,
      height,
      weight,
      bloodGroup,
      familyType,
      food,
      smooking,
      drinking,
    } = req.body;
    /* VALIDATE REQUEST */
    if (
      !religion ||
      !cast ||
      !maritialStatus ||
      !height ||
      !weight ||
      !bloodGroup ||
      !familyType ||
      !food ||
      !smooking ||
      !drinking
    ) {
      return next(ErrorHandlerService.validationError());
    }
    try {
      const user = await UserModel.findOne({ _id: req.userData?._id });
      if (!user) {
        return next(ErrorHandlerService.unAuthorized());
      }

      user.religion = religion;
      user.cast = cast;
      user.maritialStatus = maritialStatus;
      user.height = height;
      user.weight = weight;
      user.bloodGroup = bloodGroup;
      user.familyType = familyType;
      user.food = food;
      user.smooking = smooking;
      user.drinking = drinking;

      user.activationStep = user.activationStep + 1;

      await user.save();
      return res.status(200).json({ isAuth: true, user: user });
    } catch (error) {
      return next(error);
    }
  }

  /* ONLY AUTHENTICATED USER */
  async saveDesiredProfileDetails(req, res, next) {
    const {
      pReligion,
      pEducation,
      cast,
      pMaritialStatus,
      pMinAge,
      pMaxAge,
      pFamilyType,
      pFood,
      pSmooking,
      pDrinking,
      pHeight,
      pWeight,
    } = req.body;
    /* VALIDATE REQUEST */
    if (
      !pReligion ||
      !pEducation ||
      !pMaritialStatus ||
      !pMinAge ||
      !pMaxAge ||
      !pFamilyType ||
      !pFood ||
      !pSmooking ||
      !pDrinking ||
      !pHeight ||
      !pWeight
    ) {
      return next(ErrorHandlerService.validationError());
    }
    try {
      const user = await UserModel.findOne({ _id: req.userData?._id });
      if (!user) {
        return next(ErrorHandlerService.unAuthorized());
      }

      user.pReligion = pReligion;
      user.pCast = cast;
      user.pMaritialStatus = pMaritialStatus;
      user.pHeight = pHeight;
      user.pWeight = pWeight;
      user.pFamilyType = pFamilyType;
      user.pFood = pFood;
      user.pSmooking = pSmooking;
      user.pDrinking = pDrinking;
      user.pMaxAge = pMaxAge;
      user.pMinAge = pMinAge;

      user.activationStep = user.activationStep + 1;
      user.isActivated = true;

      await user.save();
      return res.status(200).json({ isAuth: true, user: user });
    } catch (error) {
      return next(error);
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    /* REQUEST VALIDATION */
    if (!email || !password) {
      return next(ErrorHandlerService.validationError());
    }
    /* CHECK USER EXIST OR NOT */
    let user;
    try {
      user = await UserModel.findOne({ email });
      if (!user) {
        return next(
          ErrorHandlerService.wrongCredentials("User not exist of that email.")
        );
      }
    } catch (error) {
      next(error);
    }
    /* COMPARE PASSWORD WIHT STORED HASHED PASSWORD */
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(ErrorHandlerService.wrongCredentials("Invalid password."));
    }

    /* GENERAT TOKENS  */
    const { accessToken, refreshToken } = await tokenService.genrateTokens({
      _id: user._id,
      role: user.role,
      gender: user.gender,
    });

    /* SAVE REFRESH TOKEN INTO DB OR UPDATE PREVIOUS REFRESH TOKEN OF USER */
    try {
      const isExist = await tokenService.findRefreshToken({ user: user._id });
      if (isExist) {
        /* IF ALREADY EXIST TOKEN INTO DB THEN UPDATE TOKEN */
        await tokenService.updateRefreshToken(
          { user: user._id },
          { token: refreshToken }
        );
      } else {
        /* IF NOT THEN SIMPLY SAVED IT INTO DB */
        await tokenService.saveRefreshToken({
          user: user._id,
          token: refreshToken,
        });
      }
    } catch (error) {
      return next(error);
    }

    /* SET COOKIES  */
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    return res.status(200).json({ isAuth: true, user: user });
  }

  async refreshTokens(req, res, next) {
    // GET REFRESH TOKEN FROM COOKIES
    const { refreshToken: refreshTokenFromCookie } = req.cookies;
    // VERIFY REFRESH TOKEN
    let userData;
    try {
      userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
    } catch (error) {
      return next(ErrorHandlerService.unAuthorized());
    }

    try {
      // CHECK REFRESH TOKEN IS IN DB
      const token = await tokenService.findRefreshToken({
        user: userData._id,
        token: refreshTokenFromCookie,
      });
      if (!token) {
        return next(ErrorHandlerService.unAuthorized("No token found !"));
      }

      // ALSO CHECK USER EXIST
      const userExist = await UserModel.findOne({ _id: userData._id });

      if (!userExist) {
        return next(ErrorHandlerService.unAuthorized("No user found!"));
      }

      // GENRATE NEW REFRESH TOKEN
      const { refreshToken, accessToken } = await tokenService.genrateTokens({
        _id: userData._id,
        role: userData.role,
      });
      // UPDATE REFRESH TOKEN IN DB
      await tokenService.updateRefreshToken(
        { user: userData._id },
        { token: refreshToken }
      );
      // SET NEW COOKIES
      res.cookie("accessToken", accessToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
      });
      // retrun response
      return res.status(200).json({
        user: userExist,
        isAuth: true,
      });
    } catch (error) {
      next(error);
    }
  }

  /* AUTHENTICATED USER ONLY */
  async changePassword(req, res, next) {
    const { currentPassword, newPassword } = req.body;
    /* REQUEST VALIDATION */
    if (!currentPassword || !newPassword) {
      return next(ErrorHandlerService.validationError());
    }

    try {
      /* CHECK USER EXIST OR NOT ? */
      const user = await UserModel.findOne({ _id: req.userData._id });
      if (!user) {
        return next(ErrorHandlerService.notFound());
      }
      /* CONFIRM CURRENT PASSWORD */
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return next(
          ErrorHandlerService.wrongCredentials("Current password is wrong!")
        );
      }
      /* HASHED NEW PASSWORD BEFORE SAVED INTO DB */
      const hashedPassowrd = await bcrypt.hash(newPassword, 10);
      // UPDAT PASSWORD
      await UserModel.findByIdAndUpdate(user._id, { password: hashedPassowrd });

      return res.status(200).json({ msg: "Password Changed Successfully !" });
    } catch (error) {
      next(error);
    }
  }

  async forgetPassword(req, res, next) {
    const { email } = req.body;
    /* VALIDATE REQUEST */
    if (!email) {
      return next(ErrorHandlerService.validationError());
    }
    try {
      /* CHECK EMAIL IS VALID AND USER EXIST ? */
      const user = await UserModel.findOne({ email });
      if (!user) {
        return next(ErrorHandlerService.notFound("Email does not exist"));
      }
      /* GENRATE PASSWORD RESET TOKEN */
      const resetToken = await tokenService.genratePasswordResetToke({
        _id: user._id,
      });

      /* STORE PASSWORD RESET TOKEN INTO DB */
      user.resetToken = resetToken;
      await user.save();

      // send email
      console.log(`Email Send ! Your password reset link is ${resetToken}`);
      await sendMail({
        to: user.email,
        from: "shadi.com@info1.com",
        subject: "Shadi.com Password Reset Link",
        text: `Hello ${user.firstName} ! Your password reset link is  ${FRONTEND_BASE_URL}/auth/new-password/${resetToken}/, Click on that link in order to change password`,
      });
      return res.status(200).json({ msg: "Email send...." });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    const { newPassword, token } = req.body;
    /* REQUEST VALIDATION  */
    if (!newPassword || !token) {
      return next(ErrorHandlerService.validationError());
    }
    /* CHECK TOKE IS VALID OR NOT */
    let userData;
    try {
      userData = await tokenService.verifyPasswordResetToken(token);
    } catch (error) {
      return next(
        ErrorHandlerService.badRequest("Password reset token expire !")
      );
    }

    try {
      /* VALIDATE USER INTO DB */
      const user = await UserModel.findOne({
        _id: userData._id,
        resetToken: token,
      });

      if (!user) {
        return next(ErrorHandlerService.badRequest("User Not Found  !"));
      }

      /* HASHED PASSWORD BEFORE SAVE INTO DB */
      const hashedPassowrd = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassowrd;
      user.resetToken = undefined;

      await user.save();
      return res.status(200).json({ msg: "Password reset successfully !" });
    } catch (error) {
      next(error);
    }
  }

  /* AUTHENTICATED USER ONLY */
  async logout(req, res, next) {
    // GET REFRESH TOKEN FROM COOKIES
    const { refreshToken } = req.cookies;
    // REMOVE REFRESH TOKEN
    try {
      await tokenService.removeRefreshToken({ token: refreshToken });
    } catch (error) {
      return next(error);
    }
    // REMOVIE COOKIES
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    res.json({
      user: null,
      isAuth: false,
    });
  }

  /* UPDATE PROFILE */
  async updateProfile(req, res, next) {
    handleMultipartData(req, res, async (err) => {
      if (err) {
        return next(
          ErrorHandlerService.badRequest(
            "Something went wrong while uploading profile image"
          )
        );
      }
      const filePath = req.files?.["image"]?.[0]?.path;
      const { likedProfiles, ...updateData } = req.body;
      try {
        const document = await UserModel.findByIdAndUpdate(
          req.userData._id,
          updateData,
          { new: true }
        );

        if (filePath) {
          document.imagePath = filePath;
          await document.save();
        }

        return res
          .status(200)
          .json({ message: "Profile updated successfully !", user: document });
      } catch (error) {
        next(error);
      }
    });
  }
}

export default new AuthController();
