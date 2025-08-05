import { Transaction } from "sequelize";
import { FloorMaterialService } from "../../floorMaterials/services/FloorMaterialService";
import { WallMaterialService } from "../../wallMaterials/services/WallMaterialService";
import Court from "../core/models/sequelize/Courts";
import { NewCourt } from "../core/models/classes/NewCourt";
import { CourtRepository } from "../adapters/repositories/CourtRepository";
import { BadRequestError } from "../../../errors/BadRequestError";
import { TurnService } from "./TurnService";
import { DiagramTurnRequest } from "../core/dtos/request/DiagramTurnsRequest";


export class CourtService{
  courtRepository= new CourtRepository()
  wallMaterialService= new WallMaterialService()
  floorMaterialService= new FloorMaterialService()
  turnService= new TurnService()

  createCourt=async(court:NewCourt, idClub: number,courtNumber:number, transaction: Transaction):Promise<Court>=>{
    
    const wallMaterial= await this.wallMaterialService.getWallMaterialById(court.wallMaterialId)
    if(!wallMaterial){
      throw new BadRequestError("Todas las canchas deben tener un material de pared existente")
    }
     const floorMaterial= await this.floorMaterialService.getFloorMaterialById(court.floorMaterialId)
    if(!floorMaterial){
      throw new BadRequestError("Todas las canchas deben tener un material de suelo existente")
    }
    return await this.courtRepository.createCourt(court,idClub,courtNumber,transaction)
  }

  diagramTurns=async(diagramTurns: DiagramTurnRequest,transaction:Transaction):Promise<any>=>{
    //control de que la cancha ya tiene turnos para el mes aqui
    for(const court of diagramTurns.courts){

      await this.turnService.diagramTurns(court,diagramTurns.year,diagramTurns.month,transaction)
    }
  }
}