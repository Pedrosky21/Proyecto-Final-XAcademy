import {Router} from 'express';
import { createClub, getAllClubes } from '../modules/clubes/adapters/controllers/Club.controller';

const router = Router();
router.get('/', getAllClubes);
router.post('/', createClub);

export default router;