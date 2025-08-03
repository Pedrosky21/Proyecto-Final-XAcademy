import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../../config/db.config';

class Position extends Model {}

Position.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field:'idposicion',
    autoIncrement: true,
  },
  name:{
    type: DataTypes.STRING,
    field:'nombre'
  },
  description:{
    type:DataTypes.STRING,
    field:'descripcion'
  }
}, {
  sequelize,
  modelName: 'Posicion',
  tableName: 'posicion',
  timestamps: false,
});

export default Position;
