import express from 'express';
import cors from 'cors';
import './config/database';
import developerRoutes from './routes/developer.routes';
import recruiterRoutes from './routes/recruiter.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/developers', developerRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use(errorHandler);

export default app;