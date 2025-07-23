import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers/router';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.use('/api', router);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
