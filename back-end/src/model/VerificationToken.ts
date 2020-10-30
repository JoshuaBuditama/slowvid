import mongoose from 'mongoose';

export const VerificationTokenSchema = new mongoose.Schema({
	value: String
});

export interface IVerificationToken {
	value: string;
}

export interface IVerificationTokenDocument extends IVerificationToken, mongoose.Document { };
export interface IVerificationTokenModel extends mongoose.Model<IVerificationTokenDocument> { };

export const VerificationTokenModel = mongoose.model<IVerificationTokenDocument>("verificationToken", VerificationTokenSchema);