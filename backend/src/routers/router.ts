import { Router } from 'express';
import clubRoutes from './Club.routes';
import categoryRouter from '../modules/categories/adapters/CategoryRouter';
import positionRouter from '../modules/positions/adapters/PositionsRouter';
import playerRouter from '../modules/players/adapters/PlayerRouter';
import userRouter from '../modules/users/adapters/UserRouter';
import floorMaterialRouter from '../modules/floorMaterials/adapters/MaterialFloorRouter';

const router = Router();

router.use('/categories',categoryRouter);
router.use('/floor-materials',floorMaterialRouter);
router.use('/wall-materials',floorMaterialRouter);
router.use('/positions', positionRouter);
router.use('/players', playerRouter);
router.use('/users', userRouter);
router.use('/clubes', clubRoutes);

export default router;
