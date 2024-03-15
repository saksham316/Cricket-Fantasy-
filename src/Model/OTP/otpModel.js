import mongoose from "mongoose";
// ----------------------------------------------------------------------------------------------------
const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
    },
    email: {
      type: String,
    },
    expiresAt: {
      type: Date,
      required:[true,"Expiry Time of otp must be provided"]
    },
  },
  { timestamps: true }
);

const otpModel = mongoose.model("otp", otpSchema);

export default otpModel;
