import {Model, DataTypes} from 'sequelize';
import sequelize from '../../../../config/db.config';

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
    usuario_id: DataTypes.INTEGER
},{
    sequelize,
    modelName: 'Club',
    tableName: 'club',
    timestamps: false
})

export default Club;
