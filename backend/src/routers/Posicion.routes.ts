import {Router} from 'express';
import { PosicionController } from '../modules/posiciones/adapters/controllers/Posicion.controller';

const router = Router();
const posicionController= new PosicionController()
router.get('/', posicionController.getAllPosiciones);

export default router;
