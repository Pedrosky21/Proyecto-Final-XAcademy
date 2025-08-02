import { Router } from 'express';
import authRouter from '../modules/auth/adapters/AuthRoutes';
import playerRouter from '../modules/players/adapters/PlayerRouter';
import floorMaterialRouter from '../modules/floorMaterials/adapters/MaterialFloorRouter';
import WallMaterialRouter from '../modules/wallMaterials/adapters/WallMaterialRouter';
import clubRouter from '../modules/clubs/adapters/Club.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/floor-materials',floorMaterialRouter);
router.use('/wall-materials',WallMaterialRouter);
router.use('/players', playerRouter);
router.use('/clubs', clubRouter);

export default router;
