import express from 'express';
import TransactionController from '../controllers/transactionController.js';
import { validateToken } from '../controllers/transactionValidateToken.js';
import validationTransaction from '../middlewares/transactionValidationMiddlewares.js';

const transactionRouter = express.Router();
transactionRouter.use(validateToken);

transactionRouter.post('/transaction', validationTransaction, TransactionController?.store);
transactionRouter.get('/transaction', TransactionController?.findTransactions);
transactionRouter.delete('/transaction/:id', TransactionController?.delete);
transactionRouter.put('/transaction/:id', TransactionController?.update);

export default transactionRouter;