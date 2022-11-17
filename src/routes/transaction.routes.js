import express from 'express';
import TransactionController from '../controllers/transactionController.js';

const transactionRouter = express.Router();

transactionRouter.post('/transaction', TransactionController?.store);

export default transactionRouter;