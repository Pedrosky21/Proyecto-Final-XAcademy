import {Model, DataTypes} from 'sequelize';
import sequelize from '../../../../config/db.config';

class User extends Model {};

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field:'idusuarios',
        autoIncrement: true
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'usuarios',
    tableName: 'usuarios',
    timestamps: false
});

export default User;
