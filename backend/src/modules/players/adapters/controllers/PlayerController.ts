import { NextFunction, Request, Response } from "express";
import { PlayerService } from "../../services/PlayerService";
import { NewPlayerRequest } from "../../core/dtos/request/NewPlayerRequest";
import { BadRequestError } from "../../../../errors/BadRequestError";


export class PlayerController{
  playerService= new PlayerService()

  createPlayer= async(req:Request, res:Response,next: NextFunction):Promise<any>=>{
    try {
      const newPlayerRequest = new NewPlayerRequest(req.body);

      const error:string|null= newPlayerRequest.validate();
      if(error) throw new BadRequestError(error)

      const newPlayer = await this.playerService.createJugador(newPlayerRequest)

      res.status(201).json(newPlayer);
    } catch (error) {
      next(error)
    }
  }
}
