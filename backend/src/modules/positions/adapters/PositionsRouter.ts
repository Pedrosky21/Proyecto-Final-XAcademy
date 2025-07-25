import {Router} from 'express';
import { PositionController } from './controllers/PositionController';


const positionRouter = Router();
const positionController= new PositionController()
positionRouter.get('/', positionController.getAllPositions);

export default positionRouter;
