import { DataTypes, Model, Optional } from "sequelize";
import Court from "./Courts";
import TurnState from "./TurnState";
import sequelize from '../../../../../config/db.config';

interface TurnAttributes {
  id: number;
  startDateTime: Date;
  endDateTime: Date;
  playerName:string
  courtId: number;
  turnStateId:number
}


interface TurnCreationAttributes extends Optional<TurnAttributes, 'id'> {}
class TurnModel  extends Model<TurnAttributes,TurnCreationAttributes> implements TurnCreationAttributes {
  public id!: number;
  public startDateTime!: Date;
  public endDateTime!: Date;
  public playerName!:string
  public courtId!: number;
  public turnStateId!:number

};

TurnModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field:"idturno",
        autoIncrement: true,
    },
    startDateTime: {
        type: DataTypes.DATE,
        field:"fechaHoraInicio",
    },
    endDateTime: {
        type: DataTypes.DATE,
        field: "fechaHoraFin",
    },
    playerName: {
        type: DataTypes.STRING,
        field: "nombre",
        },
    courtId:{
        type: DataTypes.INTEGER,
        field: "cancha_idcancha",
        references: {
            model: Court,
            key: 'id'
        }
    },
    turnStateId:{
        type: DataTypes.INTEGER,
        field: "estadoturno_idestadoturno",
        references: {
            model: TurnState,
            key: 'id'
        }
    },
},{
    sequelize,
    modelName: 'Turno',
    tableName: 'turno',
    timestamps: false
})

TurnModel.belongsTo(TurnState, { foreignKey: 'turnStateId', as: 'turnState' });
TurnModel.belongsTo(Court, {foreignKey: "courtId", as: "court"});
Court.hasMany(TurnModel, { foreignKey: "courtId", as: "turns" });
export default TurnModel;
