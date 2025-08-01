import { DataTypes, Model } from "sequelize";
import Court from "../../clubs/core/models/Courts";
import sequelize from '../../../config/db.config';
import TurnState from "./TurnState";

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
export default Turn;
