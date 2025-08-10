import { NextFunction, Request, Response } from "express";
import { ClubService } from "../../services/ClubService";
import { NotFoundError } from "../../../../errors/NotFoundError";
import { NewClubRequest } from "../../core/dtos/request/NewClubRequest";
import { BadRequestError } from "../../../../errors/BadRequestError";
import { DiagramTurnRequest } from "../../core/dtos/request/DiagramTurnsRequest";
import { TurnService } from "../../services/TurnService";
import { UserTypeEnum } from "../../../auth/core/models/enums/UserTypeEnum";

export class ClubController {
  clubService = new ClubService();
  turnService= new TurnService()


  getClubById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const club = await this.clubService.getClubById(Number(id));
      if (!club) {
        throw new NotFoundError("Club no encontrado");
      }
      res.status(201).json(club);
    } catch (error) {
      next(error);
    }
  };

  createClub = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Ejecuto lo que deberia")
    try {
      const newClubRequest = new NewClubRequest(req.body, Number(req.user?.id));

      const validationError = newClubRequest.válidate();
      if (validationError) {
        throw new BadRequestError(validationError);
      }

      const newClub = await this.clubService.createClub(newClubRequest);
      res.status(201).send(newClub);
    } catch (error) {
      next(error);
    }
  };

  getClubByUserId = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Ejecuto lo que no deberia")
    try {
      const userId = req.user?.id;
      const club = await this.clubService.getClubByUserId(Number(userId));

      res.status(200).send(club);
    } catch (error) {
      next(error);
    }
  };

  diagramTurns = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clubUser = req.user?.id;
      //reemplazar por el que toma del token
      if (!clubUser) {
        throw new BadRequestError(
          "Debe pasar el id de un usuario que tenga un club"
        );
      }
      const diagramTurnRequest = new DiagramTurnRequest(req.body);

      const validationError = diagramTurnRequest.validate();
      if (validationError) {
        throw new BadRequestError(validationError);
      }

      await this.clubService.diagramTurns(clubUser, diagramTurnRequest);

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

  getTurnsByWeek = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clubUser = req.user?.id;
      console.log(clubUser)
      if (!clubUser) {
        throw new BadRequestError(
          "Debe pasar el id de un usuario que tenga un club"
        );
      }
      const { courtId, startDate } = req.query;

      if (!courtId) {
        throw new BadRequestError("Debe pasar el id de una cancha valida");
      }
      if (!startDate) {
        throw new BadRequestError(
          "El query startDate debe ser una fecha valida"
        );
      }

      let date: Date;
        if ((startDate as string).includes('/')) {
          // Asume formato DD/MM/YYYY
          const [day, month, year] = (startDate as string).split('/').map(Number);
          date = new Date(year, month - 1, day);
        } else {
          // Asume formato ISO
          date = new Date(startDate as string);
        }
      if (isNaN(date.getTime())) {
        throw new BadRequestError(
          "El query startDate debe ser una fecha válida"
        );
      }
      if (date.getDay() !== 0) {
        throw new BadRequestError("El startDate debe ser un domingo");
      }
      const turns= await this.clubService.getCourtTurnsByWeek(Number(courtId),date)

      res.status(200).json(turns);
    } catch (error) {
      next(error);
    }
  };


  setTurnAsPaid = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clubUser = req.user?.id;
      //reemplazar por el que toma del token
      if (!clubUser) {
        throw new BadRequestError(
          "Debe pasar el id de un usuario que tenga un club"
        );
      }

      const {turnId,playerName}=req.body

      if(!playerName || typeof(playerName)!=="string"){
        throw new BadRequestError("El nombre de jugador es requerido y debe ser numérico")
      }

      if(!turnId || typeof(turnId)!=="number"){
        throw new BadRequestError("El turnId debe ser un número")
      }
      await this.turnService.payTurn(Number(turnId),UserTypeEnum.Club,playerName)

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

  setTurnAsReserved= async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clubUser = req.user?.id;
      //reemplazar por el que toma del token
      if (!clubUser) {
        throw new BadRequestError(
          "Debe pasar el id de un usuario que tenga un club"
        );
      }

      const {turnId,playerName}=req.body

      if(!playerName || typeof(playerName)!=="string"){
        throw new BadRequestError("El nombre de jugador es requerido y debe ser numérico")
      }

      if(!turnId || typeof(turnId)!=="number"){
        throw new BadRequestError("El turnId debe ser un número")
      }
      await this.turnService.reserveTurn(Number(turnId),UserTypeEnum.Club,playerName)

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

  cancelReservation= async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clubUser = req.user?.id;
      //reemplazar por el que toma del token
      if (!clubUser) {
        throw new BadRequestError(
          "Debe pasar el id de un usuario que tenga un club"
        );
      }

      const {turnId}=req.body


      if(!turnId || typeof(turnId)!=="number"){
        throw new BadRequestError("El turnId debe ser un número")
      }
      await this.turnService.cancelReserve(Number(turnId),UserTypeEnum.Club)

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

  cancelPayment= async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clubUser = req.user?.id;
      //reemplazar por el que toma del token
      if (!clubUser) {
        throw new BadRequestError(
          "Debe pasar el id de un usuario que tenga un club"
        );
      }

      const {turnId}=req.body


      if(!turnId || typeof(turnId)==="number"){
        throw new BadRequestError("El turnId debe ser un número")
      }
      await this.turnService.cancelPayment(Number(turnId),UserTypeEnum.Club)

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

}
