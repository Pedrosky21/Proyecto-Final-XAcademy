import { NextFunction, Request, Response } from "express";
import Club from "../../core/models/Club";
import Usuario from "../../../users/core/models/UserModel";
import { ClubService } from "../../services/ClubService";
import { NotFoundError } from "../../../../errors/NotFoundError";
import { NewClubRequest } from "../../core/dtos/request/NewClubRequest";
import { BadRequestError } from "../../../../errors/BadRequestError";


export class ClubController{
  clubService = new ClubService();

  getClubById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const club = await this.clubService.getClubById(Number(id));
      if(!club){
        throw new NotFoundError("Club no encontrado")
      }
      res.status(201).json(club);
    } catch (error) {
      next(error)
    }
  };
  
  createClub = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newClubRequest= new NewClubRequest(req.body)
      
      const validationError= newClubRequest.válidate()
      if (validationError) {
        throw new BadRequestError(validationError);
      }
      console.log(req.body)
      console.log(newClubRequest)

      const newClub=await this.clubService.createClub(newClubRequest)
      res.status(201).send(newClub)

    } catch (error) {
      next(error)
    }
  }

  getClubByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const {userId}= req.query
      const club=await this.clubService.getClubByUserId(Number(userId))
      console.log(club)
      res.status(200).send(club)
    }catch(error){
      next(error)
    }
  }
  
}
