import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../../config/db.config';

class WallMaterial extends Model {};

WallMaterial.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field:'idmaterialpared',
        autoIncrement: true
    },name: {
    type: DataTypes.STRING,
    field: 'nombre'
    },
},{
    sequelize,
    modelName: 'MaterialPared',
    tableName: 'materialpared',
    timestamps: false
});

export default WallMaterial;
