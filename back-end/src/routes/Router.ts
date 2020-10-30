import express from 'express';
import MainController from '../controllers/MainController';
import passport from 'passport';
import * as HttpsPeerCert from '../security/HttpsPeerCert'

export const router = express.Router();

router.use(HttpsPeerCert.authenticate);

router.post('/register', MainController.register);
router.post('/login', MainController.login);
router.post('/confirm', passport.authenticate('jwt', { session: false }),
	MainController.confirm);
router.get('/createToken', MainController.createToken);
