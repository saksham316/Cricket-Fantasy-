import mongoose from "mongoose";
// ----------------------------------------------------------------------------------------------------
const otpSchema = new mongoose.Schema(
  {
    otp: String,
    email: String,
    expiresAt: {
      type: Date,
      default: Date.now,
      // required:[true,"Expiry Date of otp must be provided"]
    },
  },
  { timestamps: true, expireAfterSeconds: 10 }
);

const otpModel = mongoose.model("otp", otpSchema);

export default otpModel;
