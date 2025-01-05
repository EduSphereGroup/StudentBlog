import express, { Application } from 'express';
import dotenv from 'dotenv';
import postRoutes from './routes/postRoutes';
import { connectDB } from './config/db';

dotenv.config();

const app: Application = express();
app.use(express.json());

connectDB();

app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;