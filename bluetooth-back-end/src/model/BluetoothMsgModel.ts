import mongoose from 'mongoose';

export const BluetoothMsgSchema = new mongoose.Schema({
	deviceId: String,
	latestMsg: String,
});

export interface IBluetoothMsg {
	deviceId: string;
	latestMsg: string;
}

export interface IBluetoothMsgWithSignalStrength extends IBluetoothMsg {
	signalStrenth: number;
}

export interface IBluetoothMsgDocument extends IBluetoothMsg, mongoose.Document { };
export interface IBluetoothMsgModel extends mongoose.Model<IBluetoothMsgDocument> { };

export const BluetoothMsgModel = mongoose.model<IBluetoothMsgDocument>("msg", BluetoothMsgSchema);
