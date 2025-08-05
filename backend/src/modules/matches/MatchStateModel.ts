import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db.config";

class MatchState extends Model {}

MatchState.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "idestadoturno" // asi esta en bbdd
    },
    name: {
        type: DataTypes.STRING,
        field: "nombre"
    },
    description: {
        type: DataTypes.STRING,
        field: "descripcion"
    }
}, {
    sequelize,
    modelName: "MatchState",
    tableName: "estadopartido"
})

export default MatchState;
