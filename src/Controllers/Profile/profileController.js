// ---------------------------------------------Imports-------------------------------------------------------
import { profileModel } from "../../Models/Profile/profileModel.js";
import { asyncErrorHandler } from "../../Utils/Error/asyncErrorHandler.js";
import { CustomError } from "../../Utils/Error/customError.js";
import { pick } from "lodash-es";
import mongoose from "mongoose";
// -----------------------------------------------------------------------------------------------------------

// @method - POST
// @desc - controller to create the profile
// @url - /
export const createProfile = asyncErrorHandler(async (req, res) => {
  const { name, email, password } = req?.body;

  if (!name || !email || !password) {
    return new CustomError("Please provide the complete details", 400);
  }

  const payload = pick(req?.body, ["name", "email", "password"]);

  const profileDoc = new profileModel(payload);

  await profileDoc.save();

  return res.status(200).json({
    success: true,
    message: "Profile Created Successfully",
  });
});

// @method - GET
// @desc - controller to get the profile
// @url - /
export const getProfile = asyncErrorHandler(async (req, res) => {
  const profile = await profileModel.find();



  return res.render(`Pages/Profile/ProfileList`, {
    profilesList: profile
  })
});

// @method - GET
// @desc - controller to get the profile
// @url - /:userId
export const getUserProfile = asyncErrorHandler(async (req, res, next) => {

  const { userId } = req?.params;

  if (!userId) {
    const error = new CustomError("User Id is a required field", 400);
    return next(error)
  }

  console.log(userId)

  let pipeline = [
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId)
      }
    }
  ];


  const [result] = await profileModel.aggregate(pipeline);

  return res.render(`Pages/Profile/UserProfile`, {
    profile: result
  })
});
