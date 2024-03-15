// ---------------------------------------------Imports-------------------------------------------------------
import { profileModel } from "../../Model/Profile/profileModel";
import { CustomError } from "../../Utils/Error/customError";
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
  return res.status(200).json({
    success: true,
    message: "Profile Created Successfully",
    data: { profile },
  });
});
