import { Router } from "express";
import { PlayerController } from "./controllers/PlayerController";


const playerRouter = Router();
const playerController= new PlayerController()
playerRouter.post('/', playerController.createPlayer);

export default playerRouter;
