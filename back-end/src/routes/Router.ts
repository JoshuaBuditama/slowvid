import express from 'express';
import MainController from '../controllers/MainController';
import passport from 'passport';
import * as HttpsPeerCert from '../security/HttpsPeerCert'
// import verifyController from '../controllers/verifyController';
export const router = express.Router();
require('dotenv').config();
router.use(HttpsPeerCert.authenticate);
const verifyController = require('../controllers/verifyController');
router.post('/register', MainController.register);
router.post('/login', MainController.login);
router.post('/confirm', passport.authenticate('jwt', { session: false }),
	MainController.confirm);
router.get('/getcode', verifyController.getCode);
router.get('/verifycode', verifyController.verifyCode);