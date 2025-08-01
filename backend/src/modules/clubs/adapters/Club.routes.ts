import {Router} from 'express';
import { ClubController } from './controllers/Club.controller';


const clubRouter = Router();
const clubController= new ClubController()
clubRouter.post("/", clubController.createClub)
clubRouter.get("/",clubController.getClubByUserId)

export default clubRouter;