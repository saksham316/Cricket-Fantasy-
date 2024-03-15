// ----------------------------------------------Imports----------------------------------------------------
import otpModel from "../../Models/OTP/otpModel.js";
import { asyncErrorHandler } from "../../Utils/Error/asyncErrorHandler.js";
import { CustomError } from "../../Utils/Error/customError.js";
import { sendOtpMail } from "../../Utils/Mail/sendOtp.js";
import moment from "moment";
// ---------------------------------------------------------------------------------------------------------

// @method - POST
// @desc - controller to send the otp to the specified mail
// @url - /otp
export const sendOtp = asyncErrorHandler(async (req, res) => {
  // Extracting the email from the request body
  const { email } = req?.body;


  // Deleting any existing OTPs associated with the email to confirm that the user is now deleted
  await otpModel.findOneAndDelete({ email });

  // Generating a new OTP
  let otp = "";

  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }


  const expiresAt = moment().add(1, "minutes").toISOString();

  const otpDoc = new otpModel({ otp, email, expiresAt });

  await otpDoc.save();

  await sendOtpMail(email, otp);

  return res.status(200).json({
    success: true,
    message: "OTP Sent Successfully",
  });
});

// @method - POST
// @desc - controller to verify the otp
// @url - /otp/verify
export const verifyOtp = asyncErrorHandler(async (req, res, next) => {
  // Extracting the email from the request body
  const { email, otp } = req?.body;

  // fetching the otp document
  const otpDoc = await otpModel.findOne({ email });

  console.log(otpDoc)

  // Verifying OTP
  if (otpDoc && otpDoc?.otp === otp) {
    // deleting the otp after verification
    await otpModel.findOneAndDelete({ email });

    return res.status(200).json({
      success: true,
      message: "Otp Verified Successfully",
    });
  } else {
    const error = new CustomError("Invalid Otp", 400);
    return next(error)
  }
});

// @method - POST
// @desc - controller to resend the otp
// @url - /otp/resend
export const resendOtp = asyncErrorHandler(async (req, res, next) => {
  // Extracting the email from the request body
  const { email } = req?.body;

  // fetching the otp document
  const otpDoc = await otpModel.findOne({ email });



  const currentTime = moment();

  let expiresAt = moment(otpDoc?.expiresAt)

  if (currentTime.isBefore(expiresAt)) {
    const error = new CustomError("Please wait for 1 minute before resending the OTP", 400);
    return next(error)
  } else {

    // Generating a new OTP
    let otp = "";

    for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 10);
    }

    expiresAt = moment().add(1, "minutes").toISOString();

    await otpModel.findOneAndUpdate({ email }, { $set: { otp, expiresAt } })

    return res.status(200).json({
      success: true,
      message: "OTP resent successfully"
    })
  }


});
