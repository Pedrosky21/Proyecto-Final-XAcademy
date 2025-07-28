import { Transaction } from "sequelize";
import { FloorMaterialService } from "../../floorMaterials/services/FloorMaterialService";
import { WallMaterialService } from "../../wallMaterials/services/WallMaterialService";
import Court from "../core/models/Courts";
import { NewCourt } from "../core/models/NewCourt";
import { CourtRepository } from "../adapters/repositories/CourtRepository";


export class CourtService{
  courtRepository= new CourtRepository()
  wallMaterialService= new WallMaterialService()
  floorMaterialService= new FloorMaterialService()

  createCourt=async(court:NewCourt, idClub: number,courtNumber:number, transaction: Transaction):Promise<Court>=>{
    return await this.courtRepository.createCourt(court,idClub,courtNumber,transaction)
  }
}