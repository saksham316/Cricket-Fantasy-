// ----------------------------------------------Imports-------------------------------------------------
import express from "express";
import {
  resendOtp,
  sendOtp,
  verifyOtp,
} from "../../Controller/OTP/otpController.js";
// -------------------------------------------------------------------------------------------------------

export const otpRouter = express.Router();

// --------------------------------------------------------------------------------------------------------

// sendOtp
otpRouter.route("/").post(sendOtp);

// verifyOtp
otpRouter.route("/verify").post(verifyOtp);

// resendOtp
otpRouter.route("/resend").patch(resendOtp);
