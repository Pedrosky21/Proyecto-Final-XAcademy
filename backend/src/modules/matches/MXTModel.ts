import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db.config";
import Match from "./MatchModel";
import Team from "../players/core/models/TeamModel";

class MatchesTeams extends Model {};

MatchesTeams.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "idequipoxpartido"
    },
    isCreator: {
        type: DataTypes.TINYINT,
        field: "equipocreador"
    },
    matchId: {
        type: DataTypes.INTEGER,
        field: "partido_idpartido"
    },
    teamId: {
        type: DataTypes.INTEGER,
        field: "equipo_idequipo"
    }
}, {
    sequelize,
    tableName: "equipoxpartido",
    modelName: "MatchesTeams",
    timestamps: false
});

MatchesTeams.belongsTo(Match, {foreignKey: "matchId", as: "match"});
MatchesTeams.belongsTo(Team, {foreignKey: "teamId", as: "team"});

Match.hasMany(MatchesTeams, {foreignKey: "matchId"});
Match.hasMany(MatchesTeams, {foreignKey: "matchId", as: "RivalTeams" })
Team.hasMany(MatchesTeams, {foreignKey: "teamId"});

export default MatchesTeams;
