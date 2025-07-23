import {Router} from 'express';
import { getAllPosiciones } from '../modules/posiciones/adapters/controllers/Posicion.controller';

const router = Router();
router.get('/', getAllPosiciones);

export default router;
