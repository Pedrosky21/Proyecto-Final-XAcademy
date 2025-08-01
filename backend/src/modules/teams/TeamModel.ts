import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db.config";

class Team extends Model {
  public id!: number
  public name!: string
  public description!: string
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "idequipo",
      autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        field: "nombre"
    },
    description: {
        type: DataTypes.STRING,
        field: "descripcion"
    }
  },
  {
    sequelize,
    timestamps: false,
    tableName: "equipo",
    modelName: "Equipo"
  }
);

export default Team;
