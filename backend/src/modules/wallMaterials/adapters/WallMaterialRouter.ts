import {Router} from 'express';
import { WallMaterialController } from './controlles/WallMaterialController';


const WallMaterialRouter = Router();
const wallMaterialController = new WallMaterialController();
WallMaterialRouter.get('/', wallMaterialController.getAllWallMaterials);

export default WallMaterialRouter;
