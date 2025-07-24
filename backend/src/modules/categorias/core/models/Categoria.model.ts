import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../../config/db.config';

class Categoria extends Model {};

Categoria.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING
},{
    sequelize,
    modelName: 'Categoria',
    tableName: 'categoria',
    timestamps: false
});

export default Categoria;
