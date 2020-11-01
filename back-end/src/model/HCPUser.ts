import mongoose from 'mongoose';

export const HCPUserSchema = new mongoose.Schema({
	hcpID: {
		type: String,
		required: true,
		unique: true
	},
	emailAddress: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true
	},
	locked: Boolean,
	incorrectPasswordAttempts: Number,
});

export interface IHCPUser {
	emailAddress: string;
	password: string;
	locked: boolean;
	incorrectPasswordAttempts: number;
	hcpID: string;
}

export interface IHCPUserDocument extends IHCPUser, mongoose.Document { };
export interface IHCPUserModel extends mongoose.Model<IHCPUserDocument> { };

export const HCPUserModel = mongoose.model<IHCPUserDocument>("hcpuser", HCPUserSchema);
