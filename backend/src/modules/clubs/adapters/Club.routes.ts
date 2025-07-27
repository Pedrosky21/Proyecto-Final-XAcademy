import {Router} from 'express';
import { ClubController } from './controllers/Club.controller';


const clubRouter = Router();
const clubController= new ClubController()
clubRouter.get('/:id', clubController.getClubById);

export default clubRouter;