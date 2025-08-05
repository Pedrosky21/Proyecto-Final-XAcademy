import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db.config";
import Turn from "../turns/models/Turn";
import WallMaterial from "../wallMaterials/core/models/WallMaterial";
import FloorMaterial from "../floorMaterials/core/FloorMaterial";
import TurnState from "../turns/models/TurnState";
import MatchState from "./MatchStateModel";

class Match extends Model {
    public id!: number
    public roofed!: number
    public turnId!: number
    public wallMaterialId!: number
    public floorMaterialId!: number
    public matchState!: number
};

Match.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "idpartido"
    },
    roofed: {
        type: DataTypes.TINYINT,
        field: "techada"
    },
    turnId: {
        type: DataTypes.INTEGER,
        field: "turno_idturno",
        references: {
            model: Turn,
            key: "id"
        }
    },
    wallMaterialId: {
        type: DataTypes.INTEGER,
        field: "materialPared_idmaterialpared",
        references: {
            model: WallMaterial,
            key: "id"
        }
    },
    floorMaterialId: {
        type: DataTypes.INTEGER,
        field: "materialSuelo_idmaterialSuelo",
        references: {
            model: FloorMaterial,
            key: "id"
        }
    },
    matchStateId: {
        type: DataTypes.INTEGER,
        field: "estadopartido_idestadoturno", // asi esta en bbdd
        references: {
            model: TurnState,
            key: "id"
        }
    }
}, {
    sequelize,
    modelName: "Match",
    tableName: "partido",
    timestamps: false
})

Match.belongsTo(MatchState, {foreignKey: "matchStateId"});
Match.belongsTo(WallMaterial, {foreignKey: "wallMaterialId"});
Match.belongsTo(FloorMaterial, {foreignKey: "floorMaterialId"});

MatchState.hasMany(Match, {foreignKey: "matchStateId"});
WallMaterial.hasMany(Match, {foreignKey: "wallMaterialId"});
FloorMaterial.hasMany(Match, {foreignKey: "floorMaterialId"});

export default Match;
