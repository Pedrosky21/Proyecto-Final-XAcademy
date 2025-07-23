import { Request, Response } from 'express';
import Posicion from '../../core/models/Posicion.model';

export const getAllPosiciones = async (req: Request, res: Response) => {
  try {
    const posiciones = await Posicion.findAll();
    res.json(posiciones);
  } catch (error) {
    console.error('Error fetching posiciones:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
