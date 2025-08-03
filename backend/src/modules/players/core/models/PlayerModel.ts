import { Model, DataTypes } from "sequelize";
import sequelize from "../../../../config/db.config";
import Usuario from "../../../users/core/models/UserModel";
import Category from "../../../categories/core/models/CategoryModel";
import Position from "../../../positions/core/models/PositionModel";

class Player extends Model {}

Player.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "idjugador",
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      field: "nombre",
    },
    lastName: {
      type: DataTypes.STRING,
      field: "apellido",
    },
    birthDate: {
      type: DataTypes.DATE,
      field: "fechaNac",
    },
    cellNumber: {
      type: DataTypes.INTEGER,
      field: "telefono",
    },
    pictureUrl: {
      type: DataTypes.STRING,
      field: "urlFoto",
    },
    userId: {
      type: DataTypes.INTEGER,
      field: "usuario_idusuario",
      references: {
        model: Usuario,
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: "categoria_idcategoria",
      references: {
        model: Category,
        key: "id",
      },
    },
    positionId: {
      type: DataTypes.INTEGER,
      field: "posicion_idposicion",
      references: {
        model: Position,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Jugador",
    tableName: "jugador",
    timestamps: false,
  }
);

Player.belongsTo(Usuario, { foreignKey: "userId", as: "user" });
Player.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Player.belongsTo(Position, { foreignKey: "positionId", as: "position" });

Usuario.hasOne(Player, { foreignKey: "userId" });
Category.hasOne(Player, { foreignKey: "categoryId" });
Position.hasOne(Player, { foreignKey: "positionId" });

export default Player;
