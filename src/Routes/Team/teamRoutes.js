// ----------------------------------------------Imports-------------------------------------------------
import express from "express";
import { createTeam, getTeams } from "../../Controllers/Team/teamController.js";

// -------------------------------------------------------------------------------------------------------

export const teamRouter = express.Router();

// --------------------------------------------------------------------------------------------------------

// createTeam
teamRouter.route("/").post(createTeam);

// getTeam
teamRouter.route("/").get(getTeams);

// updateTeam
// teamRouter.route("/").patch(updateTeam);

// // deleteTeam
// teamRouter.route("/").delete(deleteTeam);
