import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../../../config/db.config";
import Club from "./Club";
import FloorMaterial from "../../../../floorMaterials/core/FloorMaterial";
import WallMaterial from "../../../../wallMaterials/core/models/WallMaterial";

interface CourtAttributes {
  id: number;
  clubId?: number;
  floorMaterialId?: number;
  wallMaterialId?: number;
  roofed: number;

  // Relaciones
  floorMaterial?: {
    id: number;
    name: string;
  };
  wallMaterial?: {
    id: number;
    name: string;
  };
}
interface CourtCreationAttributes extends Optional<CourtAttributes, 'id'> {}

class Court extends Model<CourtAttributes,CourtCreationAttributes> implements CourtCreationAttributes {
  public id!: number;
  public clubId?: number;
  public floorMaterialId?: number;
  public wallMaterialId?: number;
  public roofed!: number;

  // Relaciones
  public floorMaterial?: { id: number; name: string };
  public wallMaterial?: { id: number; name: string };
}

Court.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "idcancha",
      autoIncrement: true,
    },

    clubId: {
      type: DataTypes.INTEGER,
      field: "club_idclub",
      references: {
        model: Club,
        key: "id",
      },
    },
    floorMaterialId: {
      type: DataTypes.INTEGER,
      field: "materialSuelo_idmaterialSuelo",
      references: {
        model: FloorMaterial,
        key: "id",
      },
    },
    wallMaterialId: {
      type: DataTypes.INTEGER,
      field: "materialPared_idmaterialPared",
      references: {
        model: WallMaterial,
        key: "id",
      },
    },
    roofed: {
      type: DataTypes.TINYINT,
      field: "techada",
    },
  },
  {
    sequelize,
    modelName: "cancha",
    tableName: "cancha",
    timestamps: false,
  }
);

Court.belongsTo(FloorMaterial, {
  foreignKey: "floorMaterialId",
  as: "floorMaterial",
});
Court.belongsTo(WallMaterial, {
  foreignKey: "wallMaterialId",
  as: "wallMaterial",
});
Court.belongsTo(Club, { foreignKey: 'clubId' });

Club.hasMany(Court, { foreignKey: 'clubId',as: 'courts'})

export default Court;
