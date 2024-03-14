import mongoose from "mongoose";
// ----------------------------------------------------------------------------------------

export const mongoConnect = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGO_URL || "mongodb://localhost:27017"}`
    );

    console.log("Connected to Mongo Successfully");
  } catch (error) {}
};
