import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../../config/db.config';

class Category extends Model {};

Category.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field:'idcategoria',
        autoIncrement: true
    },name: {
    type: DataTypes.STRING,
    field: 'nombre'
    },
    description: {
    type: DataTypes.STRING,
    field: 'descripcion'
    },

},{
    sequelize,
    modelName: 'Categoria',
    tableName: 'categoria',
    timestamps: false
});

export default Category;
