import { Router } from "express";
import { PlayerController } from "./controllers/PlayerController";
import { verifyToken } from "../../../middleware/authMiddleware";

const playerRouter = Router();
const playerController = new PlayerController();
playerRouter.post("/", playerController.createPlayer);
playerRouter.get("/", playerController.getAllPlayers);
playerRouter.get("/search/by-name", playerController.getPlayersByName);
playerRouter.get("/categories", playerController.getAllCategories);
playerRouter.get("/positions", playerController.getAllPositions);
playerRouter.post("/team", verifyToken, playerController.createTeam);
playerRouter.get("/teams", verifyToken, playerController.getTeamsByPlayerId);
playerRouter.get("/search-teams/by-name", playerController.getTeamsByName);
playerRouter.post("/match", playerController.createMatch);
playerRouter.get("/matches", verifyToken, playerController.getMatchesWithTeams);
playerRouter.get("/my-matches", verifyToken, playerController.getMatchesForPlayer);
playerRouter.post("/accept-match", playerController.acceptMatch);
playerRouter.get("/clubs/:id",playerController.getClubsForMath)
playerRouter.get("/courts",playerController.getCourtsForMatch)
playerRouter.get("/turns",playerController.getTurnsForMatch)
playerRouter.post("/reserve-turn",verifyToken,playerController.reserveTurn)
playerRouter.get("/match/:id", playerController.getMatchById);
playerRouter.get("/:id", playerController.getPlayerById); // DEJAR AL FINAL

export default playerRouter;
