import mongoose from 'mongoose';
import { UserModel, IUserDocument } from './User';

export const QueryTableSchema = new mongoose.Schema({
	encounterToken: String,
	user: { type: mongoose.Schema.Types.ObjectId, ref: UserModel.modelName },
});

export interface IQueryTable {
	encounterToken: string;
	user: IUserDocument;
}

export interface IQueryTableDocument extends IQueryTable, mongoose.Document { };
export interface IQueryTableModel extends mongoose.Model<IQueryTableDocument> { };

export const QueryTableModel = mongoose.model<IQueryTableDocument>("querytable", QueryTableSchema);
