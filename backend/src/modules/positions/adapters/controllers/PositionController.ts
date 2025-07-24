import { NextFunction, Request, Response } from 'express';
import { PositionService } from '../../service/PosicionService';

export class PositionController{
  positionService= new PositionService()

  getAllPositions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const positions = await this.positionService.getAllPositions()
      res.json(positions);
    } catch (error) {
      next(error)
    }
  }
}
