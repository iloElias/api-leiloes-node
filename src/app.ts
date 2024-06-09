import express from 'express';
import itemRoutes from './routes/itemRoutes';
import userRoutes from './routes/userRoutes';
import setupDatabase from './config/setupDatabase';

const app = express();

setupDatabase();

app.use(express.json());

app.use('/api', itemRoutes);
app.use('/api', userRoutes);

export default app;
