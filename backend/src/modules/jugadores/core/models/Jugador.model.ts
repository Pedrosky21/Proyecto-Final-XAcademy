import {Model, DataTypes} from 'sequelize';
import sequelize from '../../../../config/db.config';

import Usuario from '../../../usuarios/core/models/Usuario.model';
import Categoria from '../../../categorias/core/models/Categoria.model';
import Posicion from '../../../posiciones/core/models/Posicion.model';


class Jugador extends Model {};

Jugador.init({
    idjugadores: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    fechaNac: DataTypes.DATEONLY,
    telefono: DataTypes.STRING,
    urlFoto: DataTypes.STRING,
    usuarios_idusuarios: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Usuario',
            key: 'id'
        }
    },
    categoria_idcategoria: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Categoria',
            key: 'idcategoria'
        }
    },
    posicion_idposicion: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Posicion',
            key: 'idposicion'
        }
    }
}, {
    sequelize,
    modelName: 'Jugador',
    tableName: 'jugador',
    timestamps: false
});

Jugador.belongsTo(Usuario, {foreignKey: 'usuario_idusuarios', as: 'usuario_idusuarios'});
Jugador.belongsTo(Categoria, {foreignKey: 'categoria_idcategoria', as: 'categoria_idcategoria'});
Jugador.belongsTo(Posicion, {foreignKey: 'posicion_idposicion', as: 'posicion_idposicion'});

Usuario.hasOne(Jugador, {foreignKey: 'usuario_idusuarios'});
Categoria.hasMany(Jugador, {foreignKey: 'categoria_idcategoria'});
Posicion.hasMany(Jugador, {foreignKey: 'posicion_idposicion'});

export default Jugador;
