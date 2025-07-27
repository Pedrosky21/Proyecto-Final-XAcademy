import { ClubRepository } from "../adapters/repositories/ClubRepository";
import Club from "../core/models/Club";

export class ClubService{
  clubRepository = new ClubRepository();

  getClubById = async (id: number): Promise<Club | null> => {
    return await this.clubRepository.getClubById(id);
  }

  getClubByUserId = async (userId: number): Promise<Club | null> => { 
    return await this.clubRepository.getClubByUserId(userId);
  }
}