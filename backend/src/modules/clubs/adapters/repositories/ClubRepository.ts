import { Transaction } from "sequelize";
import { NewClubRequest } from "../../core/dtos/request/NewClubRequest";
import Club from "../../core/models/Club";

export class ClubRepository{

  getClubById= async(id:number):Promise<Club|null>=>{
    return await Club.findByPk(id);
  }

  getClubByUserId=async(userId:number):Promise<Club|null>=>{
    return await Club.findOne({
      where: { userId }
    });
  }

  createClub= async(newClubRequest: NewClubRequest, transaction: Transaction):Promise<Club>=>{
    return await Club.create({
      name: newClubRequest.name,
      address: newClubRequest.address,
      cellNumber: newClubRequest.cellNumber,
      responsableFirstName: newClubRequest.responsableFirstName,
      responsableLastName: newClubRequest.responsableLastName,
      turnPrice: newClubRequest.turnPrice,
      openningTime: newClubRequest.openningTime,
      closingTime: newClubRequest.closingTime,
      admisionRules: newClubRequest.admisionRules,
      cancelationRules: newClubRequest.cancelationRules,
      userId: newClubRequest.userId,
    },{transaction})
  }

}