import { Router } from "express";
import { PlayersTeamsController } from "./PXTController";

const playersTeamsRouter = Router();
const playersTeamsController = new PlayersTeamsController()
playersTeamsRouter.post('/create-team', playersTeamsController.createPlayersTeams);
playersTeamsRouter.get('/', playersTeamsController.getAllPlayersTeams);

export default playersTeamsRouter;