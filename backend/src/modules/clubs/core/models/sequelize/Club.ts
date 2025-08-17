import {Model, DataTypes, Optional} from 'sequelize';
import sequelize from '../../../../../config/db.config';
import User from '../../../../auth/core/models/UserModel';
import Court from './Courts';
interface ClubAttributes {
  id: number;
  name: string;
  address: string;
  openningTime: string;
  closingTime: string;
  responsableFirstName: string;
  responsableLastName: string;
  turnPrice: string;
  cellNumber: number;
  admisionRules: string;
  cancelationRules: string;
  userId:number
  courts?: Court[];
  totalCourts?:number,
  totalTurns?:number
}


interface ClubCreationAttributes extends Optional<ClubAttributes, 'id'> {}
class Club  extends Model<ClubAttributes,ClubCreationAttributes> implements ClubCreationAttributes {
  public id!: number;
  public name!: string;
  public address!: string;
  public openningTime!: string;
  public closingTime!: string;
  public responsableFirstName!: string;
  public responsableLastName!: string;
  public turnPrice!: string;
  public cellNumber!: number;
  public admisionRules!: string;
  public cancelationRules!: string;
  public userId!:number
  public courts?: Court[];
  public totalCourts?:number
  public totalTurns?:number
};

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
        field: "reglaCancelacion"
    },
    userId: {
        type: DataTypes.INTEGER,
        field:"usuario_idusuario",
        references: {
            model: User,
            key: 'id'
        }
    },
    totalCourts: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.getDataValue('totalCourts');
        }
        },
    totalTurns: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.getDataValue('totalTurns');
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
export default Club;
