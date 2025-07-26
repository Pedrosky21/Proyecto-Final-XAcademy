import { NextFunction, Request, Response } from "express";
import { WallMaterialService } from "../../services/WallMaterialService";


export class WallMaterialController{
  wallMaterialService = new WallMaterialService();

  getAllWallMaterials = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const wallMaterials = await this.wallMaterialService.getAllWallMaterials();
      res.status(200).send(wallMaterials);
    } catch (error) {
      next(error);
    }
  };

  getWallMaterialById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const wallMaterial = await this.wallMaterialService.getWallMaterialById(id);
      if (wallMaterial) {
        res.json(wallMaterial);
      } else {
        res.status(404).json({ message: 'Wall Material not found' });
      }
    } catch (error) {
      next(error);
    }
  };
}