import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../../../../config/db.config";

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  userType: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;
  public userType!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "idusuario",
      autoIncrement: true,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userType: {
      type: DataTypes.ENUM("Jugador", "Club", "Pendiente"),
      allowNull: false,
      defaultValue: "Pendiente",
    },
  },
  {
    sequelize,
    modelName: "usuario",
    tableName: "usuario",
    timestamps: false,
  }
);

export default User;
