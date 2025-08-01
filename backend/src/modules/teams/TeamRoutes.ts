import { Router } from "express";
import { TeamController } from "./TeamController";

const teamRoutes = Router();
const teamController = new TeamController();
teamRoutes.post('/', teamController.createTeam);
teamRoutes.get('/', teamController.getAllTeams);

export default teamRoutes;
