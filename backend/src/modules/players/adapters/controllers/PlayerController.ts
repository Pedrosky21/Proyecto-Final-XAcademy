import { NextFunction, Request, Response } from "express";
import { PlayerService } from "../../services/PlayerService";
import { NewPlayerRequest } from "../../core/dtos/request/NewPlayerRequest";
import { BadRequestError } from "../../../../errors/BadRequestError";
import { CategoryService } from "../../services/CategoryService";
import { PositionService } from "../../services/PositionService";
import { TeamService } from "../../services/TeamService";
import { NewTeamRequest } from "../../core/dtos/request/NewTeamRequest";
import { UnauhtorizedError } from "../../../../errors/UnauthorizedError";

export class PlayerController {
  playerService = new PlayerService();
  categoryService = new CategoryService();
  positionService = new PositionService();
  teamService = new TeamService();

  createPlayer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const newPlayerRequest = new NewPlayerRequest(req.body);

      const error: string | null = newPlayerRequest.validate();
      if (error) throw new BadRequestError(error);

      const newPlayer = await this.playerService.createPlayer(newPlayerRequest);

      res.status(201).json(newPlayer);
    } catch (error) {
      next(error);
    }
  };

  getAllPlayers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const players = await this.playerService.getAllPlayers();
      res.json(players);
    } catch (error) {
      next(error);
    }
  };

  getPlayerById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const player = await this.playerService.getPlayerById(Number(id));
      res.json(player);
    } catch (error) {
      next(error);
    }
  };

  getPlayersByName = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { fullName } = req.query as { fullName?: string };

      if (!fullName || fullName.trim() === "") {
        res
          .status(400)
          .json({ message: "fullName query parameter is required" });
        return;
      }

      const players = await this.playerService.getPlayersByName(fullName);
      res.json(players);
    } catch (error) {
      next(error);
    }
  };

  // Categorias
  getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  };

  // Posiciones
  getAllPositions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const positions = await this.positionService.getAllPositions();
      res.json(positions);
    } catch (error) {
      next(error);
    }
  };

  // Teams
  createTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const creatorId = req.user?.id; // es la id del usuario, deberia extraerse del token

      if (!creatorId) {
        throw new UnauhtorizedError("No existe el usuario");
      }


      const team = new NewTeamRequest(req.body);

      const validationError = team.validate();
      if (validationError) {
        throw new BadRequestError(validationError);
      }

      const newTeam = await this.teamService.createTeam(
        Number(creatorId),
        team
      );

      res.status(201).json(newTeam);
    } catch (error) {
      next(error);
    }
  };
}
