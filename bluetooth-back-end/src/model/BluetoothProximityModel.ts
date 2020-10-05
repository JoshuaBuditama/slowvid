import mongoose from 'mongoose';
import { BluetoothMsgModel, IBluetoothMsgDocument } from './BluetoothMsgModel';

export const BluetoothProximitySchema = new mongoose.Schema({
	first: { type: mongoose.Schema.Types.ObjectId, ref: BluetoothMsgModel.modelName },
	second: { type: mongoose.Schema.Types.ObjectId, ref: BluetoothMsgModel.modelName },
	signalStrenth: Number,
});

export interface IBluetoothProximity {
	first: IBluetoothMsgDocument;
	second: IBluetoothMsgDocument;
	signalStrenth: number;
}

export interface IBluetoothProximityDocument extends IBluetoothProximity, mongoose.Document { };
export interface IBluetoothProximityModel extends mongoose.Model<IBluetoothProximityDocument> { };

export const BluetoothProximityModel = mongoose.model<IBluetoothProximityDocument>("bluetoothproximity", BluetoothProximitySchema);
