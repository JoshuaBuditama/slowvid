import express from 'express';
import MainController from '../controllers/MainController';
import passport from 'passport';

export const router = express.Router();
router.post('/register', MainController.register);
router.post('/login', MainController.login);
router.get('/testy', passport.authenticate('jwt', {session: false}), (req: express.Request, res: express.Response) => {
	res.send('Testy!');
});
