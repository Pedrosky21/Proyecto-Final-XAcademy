import {Model, DataTypes} from 'sequelize';
import sequelize from '../../../../config/db.config';
import Usuario from '../../../users/core/models/UserModel';
import Category from '../../../categories/core/models/CategoryModel';
import Position from '../../../positions/core/models/PositionModel';


class Player extends Model {};

Player.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field:'idjugadores',
        autoIncrement: true
    },
    firstName:{
        type:DataTypes.STRING,
        field:'nombre'
    },
    lastName: {
        type:DataTypes.STRING,
        field:'apellido'
    },
    birthDate: {
        type:DataTypes.DATE,
        field:'fechaNac'
    },
    cellNumber:{
        type:DataTypes.INTEGER,
        field:'telefono'

    },
    pictureUrl:{
        type:DataTypes.STRING,
        field:'urlFoto'
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'usuarios_idusuarios',
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        field: 'categoria_idcategoria',
        references: {
            model: Category,
            key: 'id'
        }
    },
    positionId: {
        type: DataTypes.INTEGER,
        field: 'posicion_idposicion',
        references: {
            model: Position,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Jugador',
    tableName: 'jugadores',
    timestamps: false
});

Player.belongsTo(Usuario, { foreignKey: 'usuarios_idusuarios', as: 'usuario' });
Player.belongsTo(Category, { foreignKey: 'categoria_idcategoria', as: 'categoria' });
Player.belongsTo(Position, { foreignKey: 'posicion_idposicion', as: 'posicion' });

Usuario.hasOne(Player, { foreignKey: 'usuarios_idusuarios' }); 
Category.hasOne(Player, { foreignKey: 'categoria_idcategoria' }); 
Position.hasOne(Player, { foreignKey: 'posicion_idposicion' });

export default Player;