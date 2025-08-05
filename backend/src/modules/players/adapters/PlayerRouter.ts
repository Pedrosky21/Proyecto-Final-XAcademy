import { Router } from "express";
import { PlayerController } from "./controllers/PlayerController";
import { verifyToken } from "../../../middleware/authMiddleware";


const playerRouter = Router();
const playerController= new PlayerController();
playerRouter.post('/', playerController.createPlayer);
playerRouter.get('/', playerController.getAllPlayers);
playerRouter.get('/search/by-name', playerController.getPlayersByName);
playerRouter.get('/categories', playerController.getAllCategories);
playerRouter.get('/positions', playerController.getAllPositions);
playerRouter.post('/team', verifyToken, playerController.createTeam);
playerRouter.get('/teams', verifyToken, playerController.getTeamsByPlayerId);
playerRouter.post('/match', playerController.createMatch);
playerRouter.get('/matches', playerController.getMatchesWithTeams);
playerRouter.get('/:id', playerController.getPlayerById); // DEJAR AL FINAL

export default playerRouter;
