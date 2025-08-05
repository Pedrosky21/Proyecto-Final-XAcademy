import {Model, DataTypes} from 'sequelize';
import sequelize from '../../../../config/db.config';

import Court from './Courts';
import User from '../../../auth/core/models/UserModel';


class Club extends Model {};

Club.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field:"idclub",
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        field: "nombre"
    },
    address: {
        type: DataTypes.STRING,
        field: "direccion"
    },
    openningTime: {
        type: DataTypes.TIME,
        field: "horaInicio"
    },
    closingTime: {
        type: DataTypes.TIME,
        field: "horaCierre"
    },
    responsableFirstName: {
        type: DataTypes.STRING,
        field: "nombreResponsable"
    },
    responsableLastName: {
        type: DataTypes.STRING,
        field: "apellidoResponsable"
    },
    cellNumber:{
        type: DataTypes.STRING,
        field: "telefonoClub"
    },
    turnPrice:{
        type: DataTypes.INTEGER,
        field: "precioTurno"
    },
    admisionRules: {
        type: DataTypes.STRING,
        field: "reglaAdmision"
    },
    cancelationRules: {
        type: DataTypes.STRING,
        field: "reglacancelacion"
    },
    userId: {
        type: DataTypes.INTEGER,
        field:"usuario_idusuario",
        references: {
            model: User,
            key: 'id'
        }
    }
},{
    sequelize,
    modelName: 'Club',
    tableName: 'club',
    timestamps: false
})


Club.belongsTo(User, { foreignKey: 'usuario_idusuario', as: 'usuario' });
User.hasOne(Club, { foreignKey: 'usuario_idusuario' });
//Club.hasMany(Court, { foreignKey: 'clubId',as: 'courts'});
export default Club;
