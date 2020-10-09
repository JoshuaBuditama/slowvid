import express from 'express';
import ioserver from 'socket.io';
import MainController from '../controllers/MainController';
import { IBluetoothMsg } from '../model/BluetoothMsgModel';
import { ISMS } from '../model/SMSModel';

export const router = express.Router();
router.get('/messages', MainController.getMessages);
router.get('/deletemessages', MainController.deleteMessages);
router.get('/proximities', MainController.getProximities);
router.post('/addproximity', MainController.addProximity);
router.get('/deleteproximities', MainController.deleteProximities);

export const iorouter = (socket: ioserver.Socket) => {
	socket.on('broadcast', async (str: string) => {
		const msg: IBluetoothMsg = {
			deviceId: socket.id,
			latestMsg: str,
		};
		await MainController.addorUpdateMessage(msg);
	});
	socket.on('smsregister', async (phoneNumber: string) => {
		await MainController.addSMSDevice(socket.id, phoneNumber);
	});
	socket.on('sms', async (sms: ISMS) => {
		await MainController.sendSMS(sms);
	});
};
