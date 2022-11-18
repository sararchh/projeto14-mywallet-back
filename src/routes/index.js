import express from 'express';
import authRoutes from './auth.routes.js';
import transactionRouter from './transaction.routes.js';

const routes = express.Router();

routes.use(authRoutes);
routes.use(transactionRouter);

export default routes;