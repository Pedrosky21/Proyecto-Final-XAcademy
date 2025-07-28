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

      const newClub=await this.clubService.createClub(newClubRequest)
      res.status(201).send(newClub)

    } catch (error) {
      next(error)
    }
  }
}
// Obtener todos los clubes
export const getAllClubes = async (req: Request, res: Response) => {
  try {
    const clubes = await Club.findAll({
      include: [
        {
          model: Usuario,
          as: "usuario",
        },
      ],
    });
    res.json(clubes);
  } catch (error) {
    console.error("Error fetching jugadores:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
