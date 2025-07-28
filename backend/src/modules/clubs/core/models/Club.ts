import {Model, DataTypes} from 'sequelize';
import sequelize from '../../../../config/db.config';

import Usuario from '../../../users/core/models/UserModel';


class Club extends Model {};

Club.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field:"idclubes",
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
    closingTimeTime: {
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
        field:"usuarios_idusuarios",
        references: {
            model: Usuario,
            key: 'idusuarios'
        }
    }
},{
    sequelize,
    modelName: 'Clubes',
    tableName: 'clubes',
    timestamps: false
})


Club.belongsTo(Usuario, { foreignKey: 'usuarios_idusuarios', as: 'usuario' });
Usuario.hasOne(Club, { foreignKey: 'usuarios_idusuarios' });
export default Club;
