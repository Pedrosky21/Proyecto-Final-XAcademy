import {Model, DataTypes} from 'sequelize';
import sequelize from '../../../../config/db.config';

import Usuario from '../../../usuarios/core/models/Usuario.model';
import Categoria from '../../../categorias/core/models/Categoria.model';
import Posicion from '../../../posiciones/core/models/Posicion.model';


class Jugador extends Model {};

Jugador.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    fechaNac: DataTypes.DATEONLY,
    telefono: DataTypes.STRING,
    urlFoto: DataTypes.STRING,
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Usuario',
            key: 'id'
        }
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Categoria',
            key: 'id'
        }
    },
    posicion_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Posicion',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Jugador',
    tableName: 'jugador',
    timestamps: false
});

Jugador.belongsTo(Usuario, {foreignKey: 'usuario_id', as: 'usuario'});
Jugador.belongsTo(Categoria, {foreignKey: 'categoria_id', as: 'categoria'});
Jugador.belongsTo(Posicion, {foreignKey: 'posicion_id', as: 'posicion'});

Usuario.hasOne(Jugador, {foreignKey: 'usuario_id'});
Categoria.hasMany(Jugador, {foreignKey: 'categoria_id'});
Posicion.hasMany(Jugador, {foreignKey: 'posicion_id'});

export default Jugador;
