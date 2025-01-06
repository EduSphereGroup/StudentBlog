import express from 'express';
import bodyParser from 'body-parser';
import postRoutes from './routes/Posts';
import userRoutes from './routes/Users';

const app = express();

app.use(bodyParser.json());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

export default app;