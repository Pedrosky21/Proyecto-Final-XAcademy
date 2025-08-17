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
import { Transaction } from "sequelize";
import AppError from "../../errors/AppError";
import { ClubService } from "../clubs/services/ClubService";
import { TurnService } from "../clubs/services/TurnService";
import { PlayerService } from "../players/services/PlayerService";
import { match } from "assert";
import { UserTypeEnum } from "../auth/core/models/enums/UserTypeEnum";

export class MatchService {
  matchRepository = new MatchRepository();
  teamService = new TeamService();
  wallMaterialService = new WallMaterialService();
  floorMaterialService = new FloorMaterialService();
  timeSlotService = new TimeSlotService();
  clubService = new ClubService();
  turnService = new TurnService();
  playerService = new PlayerService();

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

      if (!Array.isArray(timeSlots) || timeSlots.length === 0) {
        throw new AppError(
          "TimeSlots debe ser un array con al menos un elemento"
        );
      }

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

  teamsByMatchId = async (matchId: number): Promise<any> => {
    const count = await this.matchRepository.teamsByMatchId(matchId);
    return count;
  };

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
      const matchesTeams = await this.teamsByMatchId(matchId);
      if (matchesTeams.count > 1) {
        throw new AppError("El partido ya tiene un equipo asociado");
      }
      // ver si el equipo asociado tiene un jugador que tmb esta en el que intenta aceptar
      if (matchesTeams.count > 0) {
        // Obtener jugadores del equipo que solicitó el partido (primer equipo en matchesTeams)
        const requestingTeamPlayers =
          matchesTeams.rows[0].team.PlayersTeams.map(
            (pt: { playerId: any }) => pt.playerId
          );

        // Obtener jugadores del equipo que quiere aceptar el partido
        const acceptingTeamPlayers = team.PlayersTeams.map(
          (pt: { playerId: any }) => pt.playerId
        );

        // Verificar si hay jugadores en común
        const commonPlayers = requestingTeamPlayers.filter((playerId: any) =>
          acceptingTeamPlayers.includes(playerId)
        );

        if (commonPlayers.length > 0) {
          throw new AppError(
            "No puede aceptar el partido porque tiene jugadores en común con el equipo solicitante"
          );
        }
      }
      // ver si el equipo asociado es el mismo que intenta aceptar
      const matchXTeam = await this.getMatchTeam(teamId, matchId);
      if (matchXTeam && matchXTeam.teamId === teamId) {
        throw new AppError("No puede aceptar partidos de su mismo equipo");
      }
      // crear matchXTeam
      const toCreateMatchXTeam = new NewMatchesTeams({
        isCreator: 0,
        matchId: matchId,
        teamId: teamId,
      });
      await this.matchRepository.createMatchesTeams(
        toCreateMatchXTeam,
        transaction
      );

      // cambiar estado partido
      await this.setMatchToPending(matchId, transaction);

      // Obtener datos completos partido con estado actualizado
      const updatedMatch = await this.getMatchById(matchId, transaction);

      await transaction.commit();

      return updatedMatch;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  getClubsForMatch = async (matchId: number): Promise<any> => {
    const transaction = await sequelize.transaction();

    try {
      const match = await this.matchRepository.getMatchById(
        matchId,
        transaction
      );

      if (!match) {
        throw new NotFoundError("Partido no encontrado");
      }
      const preferences = await this.matchRepository.getMatchPreferences(
        matchId
      );

      const clubs = await this.clubService.getClubsForMatch(preferences);
      transaction.commit();

      return clubs;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  getCourtsForMatch = async (matchId: number, clubId: number): Promise<any> => {
    const transaction = await sequelize.transaction();
    try {
      const match = await this.matchRepository.getMatchById(
        matchId,
        transaction
      );

      if (!match) {
        throw new NotFoundError("Partido no encontrado");
      }
      const preferences = await this.matchRepository.getMatchPreferences(
        matchId
      );

      const club = await this.clubService.getCourtsForMatch(
        preferences,
        clubId
      );

      transaction.commit();
      return club;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  getTurnsForMatch = async (
    matchId: number,
    courtId: number,
    startDay: Date
  ): Promise<any> => {
    const transaction = await sequelize.transaction();
    try {
      const match = await this.matchRepository.getMatchById(
        matchId,
        transaction
      );

      if (!match) {
        throw new NotFoundError("Partido no encontrado");
      }
      const preferences = await this.matchRepository.getMatchPreferences(
        matchId
      );

      const turns = await this.turnService.getCourtTurnsByWeek(
        courtId,
        startDay,
        preferences
      );

      transaction.commit();
      return turns;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  reserveTurnForMatch = async (
    matchId: number,
    turnId: number,
    userId: number
  ): Promise<any> => {
    const player = await this.playerService.getPlayerByUserId(userId);

    const fullName =
      player.getDataValue("lastName") + " " + player.getDataValue("firstName");

    const transaction = await sequelize.transaction();
    try {
      await this.turnService.reserveTurn(
        turnId,
        UserTypeEnum.Player,
        fullName,
        transaction
      );

      await this.matchRepository.reserveTurn(matchId, turnId, transaction);

      transaction.commit();
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  };
}
