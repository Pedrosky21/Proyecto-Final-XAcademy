import {Router} from 'express';
import { getAllCategorias } from '../modules/categorias/adapters/controllers/Categoria.controller';

const router = Router();
router.get('/', getAllCategorias);

export default router;
