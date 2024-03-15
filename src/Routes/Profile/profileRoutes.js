// ----------------------------------------------Imports-------------------------------------------------
import express from "express";
import {
  createProfile,
  getProfile,
} from "../../Controllers/Profile/profileController.js";
// -------------------------------------------------------------------------------------------------------

export const profileRouter = express.Router();

// --------------------------------------------------------------------------------------------------------

// createProfile
profileRouter.route("/").post(createProfile);

// getProfile
profileRouter.route("/").get(getProfile);
