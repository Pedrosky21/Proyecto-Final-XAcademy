import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers/router';
import { ErrorHandler } from './middleware/errorHandlerMiddleware';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.use('/api', router);
app.use(ErrorHandler)
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
