import express from 'express';
import ioserver from 'socket.io';
import MainController from '../controllers/MainController';

export const router = express.Router();
router.get('/messages', MainController.getMessages);

export const iorouter = (socket: ioserver.Socket) => {
	socket.on('message', MainController.addMessage);
};
