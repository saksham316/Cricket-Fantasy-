// ----------------------------------------------Imports-------------------------------------------------
import express from "express";
import { createTermsAndConditions, getTermsAndConditions } from "../../Controllers/TermsAndConditions/termsAndConditionsController.js";

// -------------------------------------------------------------------------------------------------------

export const termsAndConditionsRouter = express.Router();

// --------------------------------------------------------------------------------------------------------

// createProfile
termsAndConditionsRouter.route("/").patch(createTermsAndConditions);

// getProfile
termsAndConditionsRouter.route("/").get(getTermsAndConditions);
