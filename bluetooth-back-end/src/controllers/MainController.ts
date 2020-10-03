import express from 'express';
import { BluetoothMsgModel, IBluetoothMsgDocument } from '../model/BluetoothMsgModel';

// export const getDevices = (req: express.Request, res: express.Response) => {
// 	BluetoothMsgModel.create({deviceId: "TEST"}, (err, res) => {

// 	});
// 	return res.status(200).json({ success: true});
// };



export const getMessages = async (req: express.Request, res: express.Response<IBluetoothMsgDocument[]>): Promise<void> => {
	await BluetoothMsgModel.find({}, (err: any, messages: IBluetoothMsgDocument[]) => {
		if (err) {
			console.log(err);
			return res.status(400);
		}
		// if (!messages.length) {
		// 	return res.status(404).json([]);
		// }
		return res.status(200).json(messages);
	}).catch((err: any) => console.log(err));
};

export const addMessage = () => {
	console.log('message');
};

const MainController = {
	getMessages,
	addMessage,
};

export default MainController;
