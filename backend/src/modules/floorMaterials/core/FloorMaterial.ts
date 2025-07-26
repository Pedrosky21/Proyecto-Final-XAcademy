import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/db.config';

class FloorMaterial extends Model {};

FloorMaterial.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field:'idmaterialsuelo',
        autoIncrement: true
    },name: {
    type: DataTypes.STRING,
    field: 'nombre'
    },
},{
    sequelize,
    modelName: 'MaterialSuelo',
    tableName: 'materialSuelo',
    timestamps: false
});

export default FloorMaterial;
