import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../../config/db.config';

class Posicion extends Model {}

Posicion.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Posicion',
  tableName: 'posicion',
  timestamps: false,
});

export default Posicion;
