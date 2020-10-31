import express from 'express';
import MainController from '../controllers/MainController';

export const userRouter = express.Router();

userRouter.post('/submitToken', MainController.submitToken);
