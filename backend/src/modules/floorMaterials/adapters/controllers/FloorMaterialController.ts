import { NextFunction, Request, Response } from "express";
import { FloorMaterialService } from "../../services/FloorMaterialService";


export class FloorMaterialController{
  floorMaterialService= new FloorMaterialService()

  getAllFloorMaterials = async (req: Request, res: Response, next: NextFunction) =>{
    try{
      const floorMaterials= await this.floorMaterialService.getAllFloorMaterials();
      res.status(200).send(floorMaterials)
    }catch(error){
      next(error)
    }
  }
}