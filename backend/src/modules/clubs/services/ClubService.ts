
import { ClubRepository } from "../adapters/repositories/ClubRepository";
import { NewClubRequest } from "../core/dtos/request/NewClubRequest";
import Club from "../core/models/Club";
import { CourtService } from "./CourtService";
import sequelize from '../../../config/db.config'; 
import AppError from "../../../errors/AppError";
import Court from "../core/models/Courts";
import { UserService } from "../../users/services/UserService";
import { BadRequestError } from "../../../errors/BadRequestError";

export class ClubService{
  clubRepository = new ClubRepository();
  courtService= new CourtService()
  userService= new UserService()

  getClubById = async (id: number): Promise<Club | null> => {
    return await this.clubRepository.getClubById(id);
  }

  getClubByUserId = async (userId: number): Promise<Club | null> => { 
    return await this.clubRepository.getClubByUserId(userId);
  }

  createClub = async(newClub:NewClubRequest):Promise<any>=>{
    const user= await this.userService.getUserById(newClub.userId)
    if(!user){
      throw new BadRequestError("Usuario no existente")
    }
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
}