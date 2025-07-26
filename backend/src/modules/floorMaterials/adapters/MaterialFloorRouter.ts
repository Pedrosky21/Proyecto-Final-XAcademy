import {Router} from 'express';
import { FloorMaterialController } from './controllers/FloorMaterialController';


const floorMaterialRouter = Router();
const floorMaterialController = new FloorMaterialController();
floorMaterialRouter.get('/', floorMaterialController.getAllFloorMaterials);

export default floorMaterialRouter;
