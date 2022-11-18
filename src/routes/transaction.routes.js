import express from 'express';
import TransactionController from '../controllers/transactionController.js';
import validationTransaction from '../middlewares/transactionValidationMiddlewares.js';

const transactionRouter = express.Router();

transactionRouter.post('/transaction', validationTransaction, TransactionController?.store);
transactionRouter.get('/transaction', TransactionController?.findTransactions);

export default transactionRouter;