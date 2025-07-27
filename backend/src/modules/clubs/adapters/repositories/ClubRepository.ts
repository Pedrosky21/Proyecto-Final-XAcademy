import Club from "../../core/models/Club";

export class ClubRepository{

  getClubById= async(id:number):Promise<Club|null>=>{
    return await Club.findByPk(id);
  }

  getClubByUserId=async(userId:number):Promise<Club|null>=>{
    return await Club.findOne({
      where: { usuario_id: userId }
    });
  }
}