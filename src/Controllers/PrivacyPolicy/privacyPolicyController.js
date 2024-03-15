// ---------------------------------------------Imports-------------------------------------------------------
import { privacyPolicyModel } from "../../Models/PrivacyPolicy/privacyPolicyModel.js";
import { asyncErrorHandler } from "../../Utils/Error/asyncErrorHandler.js";
import { CustomError } from "../../Utils/Error/customError.js";
import { pick } from "lodash-es";
// -----------------------------------------------------------------------------------------------------------

// @method - POST
// @desc - controller to create the privacy policy
// @url - /
export const createPrivacyPolicy = asyncErrorHandler(async (req, res, next) => {

    const { information, howUse, security } = req?.body;

    if (!information || !howUse || !security) {
        const error = new CustomError("Please provide the complete details", 400);
        return next(error)
    }

    const payload = pick(req?.body, ["information", "howUse", "security"]);

    // identifier will be hard coded because there will be only one privacy policy document
    const privacyPolicyDoc = await privacyPolicyModel.findOneAndUpdate({ identifier: "privacyPolicyDoc" }, payload, {
        upsert: true, new: true
    });


    return res.status(200).json({
        success: true,
        message: "Privacy Policy Created Successfully",
    });
});

// @method - GET
// @desc - controller to get the privacy policy page
// @url - /
export const getPrivacyPolicy = asyncErrorHandler(async (req, res, next) => {
    const [privacyPolicyDoc] = await privacyPolicyModel.find();

    return res.render(`Pages/PrivacyPolicy/PrivacyPolicy`, {
        privacyPolicy: privacyPolicyDoc
    })

});
