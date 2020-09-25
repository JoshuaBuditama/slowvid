import mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    userId: String,
});

export interface IUser {
    userId: string;
}

export interface IUserDocument extends IUser, mongoose.Document { };
export interface IUserModel extends mongoose.Model<IUserDocument> { };

export const UserModel = mongoose.model<IUserDocument>("user", UserSchema);
