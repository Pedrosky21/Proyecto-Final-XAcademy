
import { ClubRepository } from "../adapters/repositories/ClubRepository";
import { NewClubRequest } from "../core/dtos/request/NewClubRequest";
import { CourtService } from "./CourtService";
import sequelize from '../../../config/db.config'; 
import Court from "../core/models/sequelize/Courts";
import { UserService } from "../../auth/services/UserService";
import { BadRequestError } from "../../../errors/BadRequestError";
import { NotFoundError } from "../../../errors/NotFoundError";
import Club from "../core/models/sequelize/Club";
import { DiagramTurnRequest } from "../core/dtos/request/DiagramTurnsRequest";

export class ClubService{
  clubRepository = new ClubRepository();
  courtService= new CourtService()
  userService= new UserService()

  getClubById = async (id: number): Promise<Club | null> => {
    return await this.clubRepository.getClubById(id);
  }

  createClub = async(newClub:NewClubRequest):Promise<any>=>{

    const userClub=await this.getClubByUserId(newClub.userId)

    if(userClub){
      throw new BadRequestError("El usuario ya posee un club")
    }
    const transaction= await sequelize.transaction();

    try{

      const createdClub:Club= await this.clubRepository.createClub(newClub,transaction)

      let newCourts:Court[]=[]

      for (let i=0; i<newClub.courts.length;i++) {
        const createdCourt=await this.courtService.createCourt(newClub.courts[i],createdClub.getDataValue('id'),i+1,transaction)
        newCourts.push(createdCourt)
      }
      await this.userService.setUserType(newClub.userId,"Club",transaction)
      await transaction.commit()
      return{
        createdClub,
        newCourts
      }
    }catch(error: any){
      await transaction.rollback();
      throw error
    }
  }

  getClubByUserId=async(userId:number):Promise<any>=>{
    const user=await this.userService.getUserById(userId)
    if(!user){
      throw new NotFoundError("Usuario no existente")
    }
    
    return await this.clubRepository.getClubByUserId(userId)

  }

  diagramTurns=async(userId:number, diagramTurns:DiagramTurnRequest):Promise<any>=>{
    const club= await this.getClubByUserId(userId)

    const courtsId:number[]= club.getDataValue("courts").map((court:any)=>court.id)

    const invalidCourts=diagramTurns.courts.some((court)=> !courtsId.includes(court.id))
    if(invalidCourts){
      throw new NotFoundError("Cancha no encontrada")
    }

    const transaction= await sequelize.transaction();

    try{
      await this.courtService.diagramTurns(diagramTurns,transaction)

      await transaction.commit()
      return "ok"
    }catch(error: any){
      await transaction.rollback();
      throw error
    }
  }
}