// -----------------------------------------------Imports-------------------------------------------------------
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { CustomError } from "./src/Utils/Error/customError.js";
import { mongoConnect } from "./src/Configs/DB/mongo.js";
import path from "path";
import { fileURLToPath } from "url";
// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------
dotenv.config();

const app = express();
const dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 8000;

mongoConnect();

// -------------------------------------------------------------------------------------------------------------

// ----------------------------------------------Cors Handling--------------------------------------------------
app.use(
  cors({
    origin: ["*"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    exposedHeaders: ["*", "Authorization"],
  })
);
// -------------------------------------------------------------------------------------------------------------
// ----------------------------------------------Middlewares----------------------------------------------------

app.set("view engine", "ejs");
app.set("views", path.resolve(dirname, "src/views"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------------Routes----------------------------------------------------

const versionOne = (route) => {
  return `/api/v1/${route}`;
};

// Imports
import { otpRouter } from "./src/Routes/OTP/otpRoutes.js";
import { profileRouter } from "./src/Routes/Profile/profileRoutes.js";
import { termsAndConditionsRouter } from "./src/Routes/TermsAndConditions/termsAndConditionsRoutes.js";

app.all(["/", "/api", "/api/v1"], (req, res, next) => {
  return res.status(200).json({
    message: "Welcome to Cricket Fantasy",
  });
});

app.use(versionOne("otp"), otpRouter); // otp router
app.use(versionOne("profile"), profileRouter); // profile router
app.use(versionOne("terms"), termsAndConditionsRouter); // termsAndConditions router
// -------------------------------------------------------------------------------------------------------------

// ------------------------------------------Global Error Handling----------------------------------------------
app.all("*", (req, res, next) => {
  const err = new CustomError(`No such ${req.originalUrl} url exists`, 404);
  next(err);
});

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
});
// -------------------------------------------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server Running at port ${PORT}`);
});
// -------------------------------------------------------------------------------------------------------------
