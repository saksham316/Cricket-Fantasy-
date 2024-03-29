// ----------------------------------------------Imports-------------------------------------------------
import express from "express";
import {
  createProfile,
  getProfile,
  getUserProfile,
} from "../../Controllers/Profile/profileController.js";
// -------------------------------------------------------------------------------------------------------

export const profileRouter = express.Router();

// --------------------------------------------------------------------------------------------------------

// createProfile
profileRouter.route("/").post(createProfile);

// getProfile
profileRouter.route("/").get(getProfile);

// getUserProfile
profileRouter.route("/:userId").get(getUserProfile);
