import { Request, Response } from 'express';
import Categoria from '../../core/models/Categoria.model';

export const getAllCategorias = async(req: Request, res: Response) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        console.error('Error fetching categorias:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
