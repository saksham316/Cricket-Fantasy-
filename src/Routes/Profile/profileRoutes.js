// ----------------------------------------------Imports-------------------------------------------------
import express from "express";
import {
  createProfile,
  getProfile,
} from "../../Controller/Profile/profileController";
// -------------------------------------------------------------------------------------------------------

export const profileRouter = express.Router();

// --------------------------------------------------------------------------------------------------------

// createProfile
profileRouter.route("/").post(createProfile);

// getProfile
profileRouter.route("/").get(getProfile);
