import express from 'express';
import ioserver from 'socket.io';
import MainController from '../controllers/MainController';

export const router = express.Router();
router.get('/messages', MainController.getMessages);
router.get('/deletemessages', MainController.deleteMessages);
router.get('/proximities', MainController.getProximities);
router.post('/addproximity', MainController.addProximity);
router.get('/deleteproximities', MainController.deleteProximities);

export const iorouter = (socket: ioserver.Socket) => {
	// socket.on('message', MainController.addMessage);
};
