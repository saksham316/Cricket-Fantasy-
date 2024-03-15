// ----------------------------------------------Imports---------------------------------------------
import mongoose from "mongoose";

// --------------------------------------------------------------------------------------------------

const termsAndConditionsSchema = new mongoose.Schema({
    identifier: {
        type: String
    },
    introduction: {
        type: String,
        required: [true, "Introduction is a required field"]
    },
    conditions: [
        {
            type: String
        }
    ]

});


export const termsModel = mongoose.model("termsandconditions", termsAndConditionsSchema);
