import mongoose from 'mongoose';
import { UserModel, IUserDocument } from './User';

export const UploadTableSchema = new mongoose.Schema({
	encounterToken: String,
	timeOfEncounter: Number,
	duration: Number,
	signalStrength: Number,
	user: { type: mongoose.Schema.Types.ObjectId, ref: UserModel.modelName },
});

export interface IUploadTable {
	encounterToken: string;
	timeOfEncounter: number;
	duration: number;
	signalStrength: number;
	user: IUserDocument;
}

export interface IUploadTableDocument extends IUploadTable, mongoose.Document { };
export interface IUploadTableModel extends mongoose.Model<IUploadTableDocument> { };

export const UploadTableModel = mongoose.model<IUploadTableDocument>("uploadtable", UploadTableSchema);
