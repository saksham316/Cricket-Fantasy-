// ----------------------------------------------------Imports------------------------------------------------------------------------
import mongoose from "mongoose";
// -----------------------------------------------------------------------------------------------------------------------------------

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: [true, "teamName is a required field"]
    },
    teamMembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "profile"
        }
    ]
});

export const teamModel = mongoose.model("team", teamSchema);