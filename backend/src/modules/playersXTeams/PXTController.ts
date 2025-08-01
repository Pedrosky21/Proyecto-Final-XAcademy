import { NextFunction, Request, Response } from "express";
import { PlayersTeamsService } from "./PXTService";
import { NewPlayersTeams } from "./NewPXTRequest";

export class PlayersTeamsController {
    playersTeamsService = new PlayersTeamsService();

    createPlayersTeams = async (req:Request, res:Response, next:NextFunction): Promise<any> => {
        try {
            const newPlayersTeams = new NewPlayersTeams(req.body);
            
            const error:string|null = newPlayersTeams.validate();

            const playersTeams = await this.playersTeamsService.createPlayersTeams(newPlayersTeams);
            res.status(201).json(playersTeams);
        } catch (error) {
            next(error);
        }
    };

    getAllPlayersTeams = async (req:Request, res:Response, next:NextFunction): Promise<any> => {
        try {
            const playersTeams = await this.playersTeamsService.getAllPlayersTeams();
            res.json(playersTeams);
        } catch (error) {
            next(error);
        }
    };
}
