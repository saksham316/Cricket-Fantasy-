// ----------------------------------------------Imports---------------------------------------------
import mongoose from "mongoose";

// --------------------------------------------------------------------------------------------------

const privacyPolicySchema = new mongoose.Schema({
    identifier: {
        type: String
    },
    information: {
        type: String,
        required: [true, "Information is a required field"]
    },
    howUse:
    {
        type: String,
        required: [true, "howUse is a required field"]

    },
    security:
    {
        type: String,
        required: [true, "security is a required field"]
    }


});


export const privacyPolicyModel = mongoose.model("privacyPolicy", privacyPolicySchema);
