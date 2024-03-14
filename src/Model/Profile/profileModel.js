// ----------------------------------------------Imports---------------------------------------------
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// --------------------------------------------------------------------------------------------------

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required:[true,"Password is a required field"]
  },
});

profileSchema.pre("save", async function (next) {
  //salt --  generate salt for the password
  const salt = await bcrypt.genSalt(10);

  //hashedPassword -- hashing the password
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

export const profileModel = mongoose.model("profile", profileSchema);
