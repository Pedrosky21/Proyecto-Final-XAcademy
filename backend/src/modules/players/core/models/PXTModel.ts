import { Model, DataTypes } from "sequelize";
import sequelize from "../../../../config/db.config";
import Team from "./TeamModel";
import Player from "./PlayerModel";

class PlayersTeams extends Model {
  public id!: number;
  public creator!: number;
  public playerId!: number;
  public teamId!: number;

  public team?: Team; // signo ? por si no se usa include
}

PlayersTeams.init(
  {
    id: {

        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "idjugadorxequipo",
        autoIncrement: true
    },
    creator: {
        type: DataTypes.SMALLINT,
        field: "creador"
    },
    playerId: {
        type: DataTypes.INTEGER,
        field: "jugador_idjugador",
        references: {
            model: Player,
            key: "id"
        }
    },
    teamId: {
        type: DataTypes.INTEGER,
        field: "equipo_idequipo",
        references: {
            model: Team,
            key: "id"
        }
    }

  },
  {
    sequelize,
    timestamps: false,
    tableName: "jugadorxequipo",
    modelName: "PlayersTeams"
  }
);

PlayersTeams.belongsTo(Player, {foreignKey: "playerId", as:"player"});
PlayersTeams.belongsTo(Team, {foreignKey: "teamId", as: "team"});

Player.hasMany(PlayersTeams, {foreignKey: "playerId"});
Team.hasMany(PlayersTeams, {foreignKey: "teamId"});
Team.hasMany(PlayersTeams, {foreignKey: "teamId", as: "PartnerTeams"})


export default PlayersTeams;
