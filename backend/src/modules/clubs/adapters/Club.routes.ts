import {Router} from 'express';
import { ClubController, getAllClubes } from './controllers/Club.controller';


const clubRouter = Router();
const clubController= new ClubController()
clubRouter.get('/', getAllClubes);
clubRouter.post("/", clubController.createClub)

export default clubRouter;