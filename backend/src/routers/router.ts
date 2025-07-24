import { Router } from 'express';
import categoriaRoutes from './Categoria.routes';
import posicionRoutes from './Posicion.routes';
import jugadorRoutes from './Jugador.routes';
import clubRoutes from './Club.routes';

const router = Router();

router.use('/categorias', categoriaRoutes);
router.use('/posiciones', posicionRoutes);
router.use('/jugadores', jugadorRoutes);
router.use('/clubes', clubRoutes);

export default router;
