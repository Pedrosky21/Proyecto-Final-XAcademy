import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  'mydb' as string, 
  'root' as string, 
  'root' as string, 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: Number(process.env.DB_PORT) || 3306,
    logging: false
});

export default sequelize;
