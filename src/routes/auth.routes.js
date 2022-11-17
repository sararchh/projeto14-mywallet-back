import express from 'express';
import AuthController from '../controllers/authController.js';

const loginRouter = express.Router();

loginRouter.post('/sign-up',  AuthController?.signUp);
loginRouter.post('/sign-in',  AuthController?.signIn);

export default loginRouter;