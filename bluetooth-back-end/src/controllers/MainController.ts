import express from 'express';
import { BluetoothMsgModel, IBluetoothMsgDocument, IBluetoothMsg, IBluetoothMsgWithSignalStrength } from '../model/BluetoothMsgModel';
import { BluetoothProximityModel, IBluetoothProximityDocument, IBluetoothProximity } from '../model/BluetoothProximityModel';
import * as SocketServer from './SocketServer';

export const getMessages = async (req: express.Request, res: express.Response<IBluetoothMsgDocument[]>) => {
	try {
		const messages = await BluetoothMsgModel.find({}).exec();
		res.status(200).json(messages);
	} catch (err: any) {
		console.log(err);
		res.status(400).json([]);
	}
};

export const addorUpdateMessage = async (req: IBluetoothMsg) => {
	if (!req) {
		return;
	}
	try {
		let msg: IBluetoothMsgDocument | undefined;
		const res = await BluetoothMsgModel.find({ deviceId: req.deviceId }).exec();
		if (res.length > 0) {
			for (let x of res) {
				if (x.latestMsg != req.latestMsg) {
					x.latestMsg = req.latestMsg;
					msg = await x.save();
				}
			}
		}
		else {
			msg = new BluetoothMsgModel(req);
			if (!msg) {
				return;
			}
			msg = await msg.save();
		}
		if (msg !== undefined) {
			broadcastMessage(msg);
		}
	} catch (err: any) {
		console.log(err);
	}
};

export const deleteMessages = async (req: express.Request, res: express.Response) => {
	try {
		await BluetoothMsgModel.deleteMany({}).exec();
		res.status(200).json({});
	} catch (err: any) {
		console.log(err);
		res.status(400).json({});
	}
}

export const getProximities = async (req: express.Request, res: express.Response<IBluetoothProximityDocument[]>) => {
	try {
		const prox = await BluetoothProximityModel.find({}).populate('first').populate('second').exec();
		res.status(200).json(prox);
	} catch (err: any) {
		console.log(err);
		res.status(400).json([]);
	}
};

async function broadcastMessage(newMsg: IBluetoothMsgDocument) {
	try {
		let proxies = await BluetoothProximityModel.find({ first: newMsg.id }).populate('first').populate('second').exec();
		for (const prox of proxies) {
			const f: IBluetoothMsgWithSignalStrength = {
				deviceId: prox.first.deviceId,
				latestMsg: prox.first.latestMsg,
				signalStrenth: prox.signalStrenth,
			};
			SocketServer.get().to(prox.second.deviceId).emit('broadcast', f);
		}
		proxies = await BluetoothProximityModel.find({ second: newMsg.id }).populate('first').populate('second').exec();
		for (const prox of proxies) {
			const s: IBluetoothMsgWithSignalStrength = {
				deviceId: prox.second.deviceId,
				latestMsg: prox.second.latestMsg,
				signalStrenth: prox.signalStrenth,
			};
			SocketServer.get().to(prox.first.deviceId).emit('broadcast', s);
		}
	} catch (err: any) {
		console.log(err);
	}
}

function broadcastMessageBidirectional(prox: IBluetoothProximity) {
	const f: IBluetoothMsgWithSignalStrength = {
		deviceId: prox.second.deviceId,
		latestMsg: prox.second.latestMsg,
		signalStrenth: prox.signalStrenth,
	};
	SocketServer.get().to(prox.first.deviceId).emit('broadcast', f);
	const s: IBluetoothMsgWithSignalStrength = {
		deviceId: prox.first.deviceId,
		latestMsg: prox.first.latestMsg,
		signalStrenth: prox.signalStrenth,
	};
	SocketServer.get().to(prox.second.deviceId).emit('broadcast', s);
};

export const addProximity = async (req: express.Request<{}, {}, IBluetoothProximity[]>, res: express.Response) => {
	if (!req.body || req.body.constructor == Object && Object.keys(req.body).length == 0) {
		res.status(400).json({});
		return;
	}
	const prox = new BluetoothProximityModel(req.body);
	if (!prox) {
		res.status(400).json({});
		return
	}

	try {
		const updatedProx = await prox.save();
		await updatedProx.populate('first').populate('second').execPopulate();
		broadcastMessageBidirectional(updatedProx);
		res.status(200).json({});
	} catch (err: any) {
		console.log(err);
		res.status(400).json({});
	}
};

export const deleteProximities = async (req: express.Request, res: express.Response) => {
	try {
		await BluetoothProximityModel.deleteMany({}).exec();
		res.status(200).json({});
	} catch (err: any) {
		console.log(err);
		res.status(400).json({});
	}
}

const MainController = {
	getMessages,
	addorUpdateMessage,
	deleteMessages,
	getProximities,
	addProximity,
	deleteProximities
};

export default MainController;