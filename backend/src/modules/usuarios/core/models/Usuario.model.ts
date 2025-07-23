import {Model, DataTypes} from 'sequelize';
import sequelize from '../../../../config/db.config';

class Usuario extends Model {};

Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuario',
    timestamps: false
});

export default Usuario;
