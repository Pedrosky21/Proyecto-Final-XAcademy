import { Router } from 'express';
import categoriaRoutes from './Categoria.routes';
import posicionRoutes from './Posicion.routes';

const router = Router();

router.use('/categorias', categoriaRoutes);
router.use('/posiciones', posicionRoutes);

export default router;
