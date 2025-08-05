import { DataTypes, Model } from "sequelize";
import Court from "./Courts";
import TurnState from "./TurnState";
import sequelize from '../../../../../config/db.config';

class Turn extends Model {};

Turn.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field:"idturno",
        autoIncrement: true,
    },
    startDateTime: {
        type: DataTypes.DATE,
        field:"fechaHoraInicio",
    },
    endDateTime: {
        type: DataTypes.DATE,
        field: "fechaHoraFin",
    },
    playerName: {
        type: DataTypes.STRING,
        field: "nombre",
        },
    courtId:{
        type: DataTypes.INTEGER,
        field: "cancha_idcancha",
        references: {
            model: Court,
            key: 'id'
        }
    },
    turnStateId:{
        type: DataTypes.INTEGER,
        field: "estadoturno_idestadoturno",
        references: {
            model: TurnState,
            key: 'id'
        }
    },
},{
    sequelize,
    modelName: 'Turno',
    tableName: 'turno',
    timestamps: false
})

Turn.belongsTo(TurnState, { foreignKey: 'turnStateId', as: 'turnState' });
Court.hasMany(Turn, { foreignKey: "courtId", as: "turns" });
export default Turn;
