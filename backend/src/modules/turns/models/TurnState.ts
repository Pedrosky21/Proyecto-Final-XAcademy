import { DataTypes, Model } from "sequelize";
import Court from "../../clubs/core/models/Courts";
import sequelize from '../../../config/db.config';
import Turn from "./Turn";

class TurnState extends Model {};

TurnState.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field:"idestadoturno",
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        field:"nombre",
    },
    description: {
        type: DataTypes.STRING,
        field: "descripcion",
    },
},{
    sequelize,
    modelName: 'EstadoTurno',
    tableName: 'estadoturno',
    timestamps: false
})

export default TurnState;
