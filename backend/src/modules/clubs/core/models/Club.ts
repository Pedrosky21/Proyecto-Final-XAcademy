import {Model, DataTypes} from 'sequelize';
import sequelize from '../../../../config/db.config';

import Usuario from '../../../users/core/models/UserModel';


class Club extends Model {};

Club.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    horaInicio: DataTypes.TIME,
    horaCierre: DataTypes.TIME,
    nombreResponsable: DataTypes.STRING,
    apellidoResponsable: DataTypes.STRING,
    telefonoClub: DataTypes.STRING,
    precioTurno: DataTypes.INTEGER,
    reglaCancelacion: DataTypes.STRING,
    reglaAdmision: DataTypes.STRING,
    cantCanchas: DataTypes.INTEGER,
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Usuario',
            key: 'id'
        }
    }
},{
    sequelize,
    modelName: 'Club',
    tableName: 'club',
    timestamps: false
})


Club.belongsTo(Usuario, {foreignKey: 'usuario_id', as: 'usuario'});

Usuario.hasOne(Club, {foreignKey: 'usuario_id'});

export default Club;
