import express from 'express';
import bodyParser from 'body-parser';
import postRoutes from './routes/Posts';
import userRoutes from './routes/Users';
import { setupSwagger } from '../docs/swagger';

const app = express();

app.use(bodyParser.json());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

//Configurar o Swagger
setupSwagger(app);

export default app;