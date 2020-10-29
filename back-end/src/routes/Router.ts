import express from 'express';
import MainController from '../controllers/MainController';
import passport from 'passport';

export const router = express.Router();
router.post('/register', MainController.register);
router.post('/login', MainController.login);
router.post('/confirm', passport.authenticate('jwt', { session: false }),
	MainController.confirm);
