// ---------------------------------------------Imports-------------------------------------------------------
import { termsModel } from "../../Models/TermsAndConditions/termsAndConditionsModel.js";
import { asyncErrorHandler } from "../../Utils/Error/asyncErrorHandler.js";
import { CustomError } from "../../Utils/Error/customError.js";
import { pick } from "lodash-es";
// -----------------------------------------------------------------------------------------------------------

// @method - POST
// @desc - controller to create the terms and conditions
// @url - /
export const createTermsAndConditions = asyncErrorHandler(async (req, res, next) => {

    const { introduction, conditions } = req?.body;

    if (!introduction || !conditions.length > 0) {
        const error = new CustomError("Please provide the complete details", 400);
        return next(error)
    }

    const payload = pick(req?.body, ["introduction", "conditions"]);

    // identifier will be hard coded because there will be only one terms and conditions document
    const termsDoc = await termsModel.findOneAndUpdate({ identifier: "termsDoc" }, payload, {
        upsert: true, new: true
    });


    return res.status(200).json({
        success: true,
        message: "Terms and Conditions Created Successfully",
    });
});

// @method - GET
// @desc - controller to get the terms and conditions page
// @url - /
export const getTermsAndConditions = asyncErrorHandler(async (req, res, next) => {
    const [termsDoc] = await termsModel.find();

    return res.render(`Pages/TermsAndConditions/TermsAndConditions`, {
        terms: termsDoc
    })

});
