// ----------------------------------------------Imports-------------------------------------------------
import express from "express";
import { createPrivacyPolicy, getPrivacyPolicy } from "../../Controllers/PrivacyPolicy/privacyPolicyController.js";

// -------------------------------------------------------------------------------------------------------

export const privacyPolicyRouter = express.Router();

// --------------------------------------------------------------------------------------------------------

// createProfile
privacyPolicyRouter.route("/").patch(createPrivacyPolicy);

// getProfile
privacyPolicyRouter.route("/").get(getPrivacyPolicy);
