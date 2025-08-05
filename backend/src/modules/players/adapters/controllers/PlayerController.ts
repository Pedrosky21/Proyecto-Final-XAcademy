import { NextFunction, Request, Response } from "express";
import { PlayerService } from "../../services/PlayerService";
import { NewPlayerRequest } from "../../core/dtos/request/NewPlayerRequest";
import { BadRequestError } from "../../../../errors/BadRequestError";
import { CategoryService } from "../../services/CategoryService";
import { PositionService } from "../../services/PositionService";
import { TeamService } from "../../services/TeamService";
import { NewTeamRequest } from "../../core/dtos/request/NewTeamRequest";
import { UnauhtorizedError } from "../../../../errors/UnauthorizedError";
import { NewMatchRequest } from "../../../matches/NewMatchRequest";
import { MatchService } from "../../../matches/MatchService";

export class PlayerController {
  playerService = new PlayerService();
  categoryService = new CategoryService();
  positionService = new PositionService();
  teamService = new TeamService();
  matchService = new MatchService();

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
      res.status(200).json(players);
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
      res.status(200).json(player);
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
      const { fullName } = req.body;
      const players = await this.playerService.getPlayersByName(fullName);
      res.status(200).json(players);
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
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  };

  // Posiciones
  getAllPositions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const positions = await this.positionService.getAllPositions();
      res.status(200).json(positions);
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

  // Teams of the player
  getTeamsByPlayerId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const playerId = req.user?.id;

      const teams = await this.playerService.getTeamsByPlayerId(
        Number(playerId)
      );

      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };

  // Create match
  createMatch = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const creatorTeamId = req.body.teamId;

      const match = new NewMatchRequest({
        roofed: req.body.roofed,
        turnId: req.body.turnId,
        wallMaterialId: req.body.wallMaterialId,
        floorMaterialId: req.body.floorMaterialId,
        matchState: 1,
      });

      const newMatch = await this.matchService.createMatch(creatorTeamId, match);

      res.status(201).json(newMatch);
    } catch (error) {
      next(error);
    }
  };

  // Get matches with teams
  getMatchesWithTeams = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const limit = req.query.limit || 12;
      const page = req.query.page || 1;

      // Optional filters
      const roofed =
        req.query.roofed !== undefined ? Number(req.query.roofed) : null;
      const wallMaterial =
        req.query.wallMaterial !== undefined
          ? Number(req.query.wallMaterial)
          : null;
      const floorMaterial =
        req.query.floorMaterial !== undefined
          ? Number(req.query.floorMaterial)
          : null;

      const matches = await this.matchService.getMatchesWithTeams(
        Number(limit),
        Number(page),
        roofed, 
        wallMaterial, 
        floorMaterial
      );

      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };
}
