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
<<<<<<< HEAD:backend/src/modules/users/core/models/UserModel.ts
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "idusuario",
      autoIncrement: true,
=======
        type: DataTypes.INTEGER,
        primaryKey: true,
        field:'idusuario',
        autoIncrement: true
>>>>>>> main:backend/src/modules/auth/core/models/UserModel.ts
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
<<<<<<< HEAD:backend/src/modules/users/core/models/UserModel.ts
    modelName: "usuario",
    tableName: "usuario",
    timestamps: false,
  }
);
=======
    modelName: 'usuario',
    tableName: 'usuario',
    timestamps: false
});
>>>>>>> main:backend/src/modules/auth/core/models/UserModel.ts

export default User;
