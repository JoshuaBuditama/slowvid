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
	}
});

export interface IHCPUser {
	emailAddress: string;
	password: string;
}

export interface IHCPUserDocument extends IHCPUser, mongoose.Document { };
export interface IHCPUserModel extends mongoose.Model<IHCPUserDocument> { };

export const HCPUserModel = mongoose.model<IHCPUserDocument>("hcpuser", HCPUserSchema);
