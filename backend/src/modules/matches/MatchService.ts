import { TeamService } from "../players/services/TeamService";
import { MatchRepository } from "./MatchRepository";
import { NewMatchRequest } from "./NewMatchRequest";
import { NotFoundError } from "../../errors/NotFoundError";
import sequelize from "../../config/db.config";
import { NewMatchesTeams } from "./MXTRequest";
import { WallMaterialService } from "../wallMaterials/services/WallMaterialService";
import { FloorMaterialService } from "../floorMaterials/services/FloorMaterialService";
import { TimeSlotService } from "../timeSlot/TimeSlotService";
import { NewTSREquest } from "../timeSlot/NewTSRequest";
import MatchesTeams from "./MXTModel";
import { Transaction } from "sequelize";
import AppError from "../../errors/AppError";

export class MatchService {
  matchRepository = new MatchRepository();
  teamService = new TeamService();
  wallMaterialService = new WallMaterialService();
  floorMaterialService = new FloorMaterialService();
  timeSlotService = new TimeSlotService();

  createMatch = async (
    creatorTeamId: number,
    newMatch: NewMatchRequest
  ): Promise<any> => {
    const creatorTeam = await this.teamService.getTeamById(creatorTeamId);
    if (!creatorTeam) {
      throw new NotFoundError("Equipo no encontrado");
    }
    const wallMaterial = await this.wallMaterialService.getWallMaterialById(
      newMatch.wallMaterialId
    );
    if (!wallMaterial) {
      throw new NotFoundError("Material de pared no encontrado");
    }
    const floorMaterial = await this.floorMaterialService.getFloorMaterialById(
      newMatch.floorMaterialId
    );
    if (!floorMaterial) {
      throw new NotFoundError("Material de suelo no encontrado");
    }

    const transaction = await sequelize.transaction();

    try {
      const { timeSlots, ...matchData } = newMatch;

      const match = await this.matchRepository.createMatch(
        {
          ...matchData,
        },
        transaction
      );

      const timeSlotsCreated = [];

      for (const timeSlot of timeSlots) {
        const timeSlotData = new NewTSREquest({
          ...timeSlot,
          matchId: match.id,
        });
        const timeSlotCreated = await this.timeSlotService.createTimeSlot(
          timeSlotData,
          transaction
        );
        timeSlotsCreated.push(timeSlotCreated);
      }

      const matchesTeams = new NewMatchesTeams({
        isCreator: 1,
        matchId: match.id,
        teamId: creatorTeam.id,
      });
      await this.matchRepository.createMatchesTeams(matchesTeams, transaction);

      const matchWithTimeSlots = await this.getMatchById(match.id, transaction);

      await transaction.commit();

      return matchWithTimeSlots;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  getMatchesWithTeams = async (
    limit: number,
    page: number,
    roofed: number | null,
    wallMaterial: number | null,
    floorMaterial: number | null,
    playerId: number
  ): Promise<any> => {
    const matches = this.matchRepository.getMatchesWithTeams(
      limit,
      page,
      roofed,
      wallMaterial,
      floorMaterial,
      playerId
    );
    return matches;
  };

  getMatchById = async (
    id: number,
    transaction?: Transaction
  ): Promise<any> => {
    const match = await this.matchRepository.getMatchById(id, transaction);
    return match;
  };

  getMatchTeam = async (teamId: number, matchId: number): Promise<any> => {
    const matchTeam = await this.matchRepository.getMatchTeam(teamId, matchId);
    return matchTeam;
  };

  countTeamsByMatchId = async (matchId:number): Promise<any> => {
    const count = await this.matchRepository.countTeamsByMatchId(matchId);
    return count
  }

  setMatchToPending = async (
    matchId: number,
    transaction: Transaction
  ): Promise<any> => {
    const matchUpdated = await this.matchRepository.setMatchToPending(
      matchId,
      transaction
    );
    return matchUpdated;
  };

  acceptMatch = async (teamId: number, matchId: number): Promise<any> => {
    const transaction = await sequelize.transaction();

    try {
      // ver si equipo existe
      const team = await this.teamService.getTeamById(teamId);
      if (!team) {
        throw new NotFoundError("No existe el equipo");
      }
      // ver si partido existe
      const match = await this.getMatchById(matchId, transaction);
      if (!match) {
        throw new NotFoundError("No existe el partido");
      }
      // ver si partido ya tiene equipo asociado
      const countedTeams = await this.countTeamsByMatchId(matchId);
      if (countedTeams > 1) {
        throw new AppError("El partido ya tiene un equipo asociado")
      }
      // ver si el equipo asociado es el mismo que intenta aceptar
      const matchXTeam = await this.getMatchTeam(teamId, matchId);
      if (matchXTeam.teamId === teamId) {
        throw new AppError("No puede aceptar partidos de su mismo equipo")
      }
      // crear matchXTeam
      const toCreateMatchXTeam = new NewMatchesTeams({
        isCreator: 0,
        matchId: matchId,
        teamId: teamId,
      });
      const createdMatchXTeam = await this.matchRepository.createMatchesTeams(
        toCreateMatchXTeam,
        transaction
      );

      // cambiar estado partido
      await this.setMatchToPending(matchId, transaction);

      // Obtener datos completos partido con estado actualizado
      const updatedMatch = this.getMatchById(matchId, transaction);

      await transaction.commit();

      return updatedMatch;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
}
