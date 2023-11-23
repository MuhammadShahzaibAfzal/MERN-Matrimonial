import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  /* PERSONAL DETAILS */
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  dob: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address1: {
    type: String,
    required: true,
  },

  address2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  dist: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  areaCode: {
    type: String,
    required: true,
  },
  landLine: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  /* EDUCATIONAL DETAILS */

  education: {
    type: String,
  },
  institution: {
    type: String,
  },
  graduationYear: {
    type: String,
  },
  additionalInfo: {
    type: String,
  },

  /* OCCUPATIONAL DETAILS */

  occupation: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  responsibilities: {
    type: String,
  },
  yearsOfExperience: {
    type: Number,
  },

  /* FAMILY DETAILS  */

  fatherName: {
    type: String,
  },
  motherName: {
    type: String,
  },
  numberOfBrothers: {
    type: String,
  },
  numberOfSisters: {
    type: String,
  },

  fatherOccupation: {
    type: String,
  },

  /* ADDITIONAL INFO */
  religion: {
    type: String,
  },
  cast: {
    type: String,
  },
  maritialStatus: {
    type: String,
  },
  height: {
    type: String,
  },
  weight: {
    type: String,
  },
  bloodGroup: {
    type: String,
  },
  familyType: {
    type: String,
  },
  drinking: {
    type: String,
  },
  smooking: {
    type: String,
  },
  food: {
    type: String,
  },

  /* DESIRED PROFILE DETAILS */
  pReligion: {
    type: String,
  },
  pCast: {
    type: String,
  },
  pMaritialStatus: {
    type: String,
  },
  pEducation: {
    type: String,
  },

  pFamilyType: {
    type: String,
  },
  pDrinking: {
    type: String,
  },
  pSmooking: {
    type: String,
  },
  pFood: {
    type: String,
  },
  pMinAge: {
    type: Number,
  },
  pMaxAge: {
    type: Number,
  },

  pWeight: String,
  pHeight: String,

  isActivated: {
    type: Boolean,
    default: false,
  },

  activationStep: {
    type: Number,
    default: 1,
  },

  isPhoneNumberVerified: {
    type: Boolean,
    default: false,
  },

  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  role: {
    type: String,
    default: "User",
    enum: ["User", "Member", "Admin"],
  },

  resetToken: String,

  likedProfiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
