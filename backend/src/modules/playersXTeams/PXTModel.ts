import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db.config";
import Team from "../teams/TeamModel";
import Player from "../players/core/models/PlayerModel";

class PlayersTeams extends Model {}

PlayersTeams.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "idjugadorxequipo",
      autoIncrement: true,
    },
    creator: {
      type: DataTypes.SMALLINT,
      field: "creador",
    },
    playerId: {
      type: DataTypes.INTEGER,
      field: "jugador_idjugador",
      references: {
        model: Player,
        key: "id",
      },
    },
    teamId: {
      type: DataTypes.INTEGER,
      field: "equipo_idequipo",
      references: {
        model: Team,
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "jugadorxequipo",
    modelName: "PlayersTeams",
  }
);

PlayersTeams.belongsTo(Player, {
  foreignKey: "jugador_idjugador",
  as: "player",
});
PlayersTeams.belongsTo(Team, { foreignKey: "equipo_idequipo", as: "team" });

Player.hasMany(PlayersTeams, { foreignKey: "jugador_idjugador" });
Team.hasMany(PlayersTeams, { foreignKey: "equipo_idequipo" });

export default PlayersTeams;
