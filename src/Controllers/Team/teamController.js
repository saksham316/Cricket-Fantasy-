// ---------------------------------------------Imports-------------------------------------------------------
import { teamModel } from "../../Models/Team/teamModel.js";
import { asyncErrorHandler } from "../../Utils/Error/asyncErrorHandler.js";
import { CustomError } from "../../Utils/Error/customError.js";
import { pick } from "lodash-es";
// -----------------------------------------------------------------------------------------------------------

// @method - POST
// @desc - controller to create the team 
// @url - /
export const createTeam = asyncErrorHandler(async (req, res, next) => {

    const { teamName, teamMembers } = req?.body;

    if (!teamName || !teamMembers.length > 0) {
        const error = new CustomError("Please provide the complete details", 400);
        return next(error)
    }

    const payload = pick(req?.body, ["teamName", "teamMembers"]);

    // identifier will be hard coded because there will be only one terms and conditions document
    const teamDoc = new teamModel(payload);

    await teamDoc.save();


    return res.status(200).json({
        success: true,
        message: "Team Created Successfully",
    });
});

// @method - GET
// @desc - controller to get the teams
// @url - /
export const getTeams = asyncErrorHandler(async (req, res, next) => {
    const teams = await teamModel.find().populate("teamMembers");

    return res.json({
        success: true,
        data: { teams }
    })

});