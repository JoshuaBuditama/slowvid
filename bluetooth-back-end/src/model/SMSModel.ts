import mongoose from 'mongoose';

export const SMSDeviceSchema = new mongoose.Schema({
	deviceId: String,
	phoneNumber: String,
});

export interface ISMSDevice {
	deviceId: string;
	phoneNumber: string;
}

export interface ISMS {
	phoneNumber: string;
	message: string;
}

export interface ISMSDeviceDocument extends ISMSDevice, mongoose.Document { };
export interface ISMSDeviceModel extends mongoose.Model<ISMSDeviceDocument> { };

export const SMSDeviceModel = mongoose.model<ISMSDeviceDocument>("smsdevice", SMSDeviceSchema);
