import express from 'express';
import AuthController from '../controllers/authController.js';
import { validationUserSignIn } from '../middlewares/userSignInValidationMiddlewares.js';
import validationUser from '../middlewares/userValidationMiddlewares.js';

const loginRouter = express.Router();

loginRouter.post('/sign-up', validationUser, AuthController?.signUp);
loginRouter.post('/sign-in', validationUserSignIn, AuthController?.signIn);
loginRouter.delete('/logout/:id', AuthController?.deleteSessionUser);

export default loginRouter;