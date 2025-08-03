import { Request, Response, NextFunction } from "express";
import { TeamService } from "./TeamService";
import { NewTeamRequest } from "./NewTeamRequest";

export class TeamController {
  teamService = new TeamService();

  createTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { name, description, playerId } = req.body;
      const creatorId = req.user?.id; // es la id del usuario, deberia extraerse del token

      if (!creatorId) {
        res.status(401).json({ message: "No autorizado" });
        return;
      }

      const team = new NewTeamRequest({ name, description });

      const newTeam = await this.teamService.createTeam(
        creatorId,
        team,
        playerId
      );

      res.status(201).json(newTeam);
    } catch (error) {
      next(error);
    }
  };

  getAllTeams = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const teams = this.teamService.getAllTeams();
      res.json(teams);
    } catch (error) {
      next(error);
    }
  };
}
