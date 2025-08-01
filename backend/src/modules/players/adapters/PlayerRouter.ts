import { Router } from "express";
import { PlayerController } from "./controllers/PlayerController";


const playerRouter = Router();
const playerController= new PlayerController();
playerRouter.post('/', playerController.createPlayer);
playerRouter.get('/', playerController.getAllPlayers);
playerRouter.get('/:id', playerController.getPlayerById);
playerRouter.get('/search/by-name', playerController.getPlayersByName);

export default playerRouter;
