import { DataTypes, Model } from "sequelize";
import sequelize from '../../../../config/db.config';
import Club from "./Club";
import FloorMaterial from "../../../floorMaterials/core/FloorMaterial";
import WallMaterial from "../../../wallMaterials/core/models/WallMaterial";
import Turn from "../../../turns/models/Turn";

class Court extends Model {};

Court.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field:"idcancha",
        autoIncrement: true,
    },
    number: {
        type: DataTypes.INTEGER,
        field:"número",
    },
    clubId: {
        type: DataTypes.INTEGER,
        field: "clubes_idclubes",
        references: {
            model: Club,
            key: 'id'
        }
    },
    floorMaterialId: {
        type: DataTypes.INTEGER,
        field: "materialSuelo_idmaterialSuelo",
        references: {
            model: FloorMaterial,
            key: 'id'
        }
        },
    wallMaterialId:{
        type: DataTypes.INTEGER,
        field: "materialPared_idmaterialPared",
        references: {
            model: WallMaterial,
            key: 'id'
        }
    },
    roofed:{
        type: DataTypes.TINYINT,
        field: "techada"
    },
},{
    sequelize,
    modelName: 'cancha',
    tableName: 'cancha',
    timestamps: false
})

Court.belongsTo(FloorMaterial, { foreignKey: 'floorMaterialId', as: 'floorMaterial' });
Court.belongsTo(WallMaterial, { foreignKey: 'wallMaterialId', as: 'wallMaterial' });
//Court.hasMany(Turn, { foreignKey: 'courtId', as: 'turns' });

export default Court;
