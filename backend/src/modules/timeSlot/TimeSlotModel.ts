import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db.config";

class TimeSlot extends Model {};

TimeSlot.init({
    id: {
        type: DataTypes.INTEGER,
        field: "idfranjahoraria",
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        field: "fecha",
    },
    startTime: {
        type: DataTypes.TIME,
        field: "horaInicio"
    },
    endTime: {
        type: DataTypes.TIME,
        field: "horaFin"
    }
}, {
    sequelize,
    modelName: "TimeSlot",
    tableName: "franjahoraria",
    timestamps: false
});

export default TimeSlot;
