import express from 'express';
import { BluetoothMsgModel, IBluetoothMsgDocument } from '../model/BluetoothMsgModel';
import { BluetoothProximityModel, IBluetoothProximityDocument } from '../model/BluetoothProximityModel';

export const getMessages = async (req: express.Request, res: express.Response<IBluetoothMsgDocument[]>) => {
	try {
		const messages = await BluetoothMsgModel.find({}).exec();
		res.status(200).json(messages);
	} catch (err: any) {
		console.log(err);
		res.status(400).json([]);
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

export const addProximity = async (req: express.Request, res: express.Response) => {
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
		await prox.save();
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
	deleteMessages,
	getProximities,
	addProximity,
	deleteProximities
};

export default MainController;
