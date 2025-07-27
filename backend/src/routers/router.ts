import { Router } from 'express';
import authRouter from '../modules/auth/adapters/AuthRoutes';
import categoryRouter from '../modules/categories/adapters/CategoryRouter';
import positionRouter from '../modules/positions/adapters/PositionsRouter';
import playerRouter from '../modules/players/adapters/PlayerRouter';
import userRouter from '../modules/users/adapters/UserRouter';
import floorMaterialRouter from '../modules/floorMaterials/adapters/MaterialFloorRouter';
import WallMaterialRouter from '../modules/wallMaterials/adapters/WallMaterialRouter';
import clubRouter from '../modules/clubs/adapters/Club.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/categories',categoryRouter);
router.use('/floor-materials',floorMaterialRouter);
router.use('/wall-materials',WallMaterialRouter);
router.use('/positions', positionRouter);
router.use('/players', playerRouter);
router.use('/users', userRouter);
router.use('/clubes', clubRouter);

export default router;
