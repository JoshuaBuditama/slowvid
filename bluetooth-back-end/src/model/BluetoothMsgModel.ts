import mongoose from 'mongoose';

export const BluetoothMsgSchema = new mongoose.Schema({
	deviceId: String,
});

export interface IBluetoothMsg {
	deviceId: string;
}

export interface IBluetoothMsgDocument extends IBluetoothMsg, mongoose.Document { };
export interface IBluetoothMsgModel extends mongoose.Model<IBluetoothMsgDocument> { };

export const BluetoothMsgModel = mongoose.model<IBluetoothMsgDocument>("bluetoothmsg", BluetoothMsgSchema);
