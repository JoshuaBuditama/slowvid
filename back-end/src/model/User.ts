import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
	deviceId: String,
	closeContactFlag: Boolean,
});

export interface IUser {
	deviceId: string;
	closeContactFlag: boolean;
}

export interface IUserDocument extends IUser, mongoose.Document { };
export interface IUserModel extends mongoose.Model<IUserDocument> { };

export const UserModel = mongoose.model<IUserDocument>("user", UserSchema);
