import express from 'express';
import { UserModel, IUserDocument, IUserModel } from '../model/User';

export const getCloseContactFlag = async (req: express.Request, res: express.Response<IUserDocument[]>) => {

    try{
        const PositiveUser = await UserModel.find({}).exec();
        return res.json(PositiveUser);
    }
    catch (err: any)
    {
        console.log(err);
        res.status(400).json([]);

    }
};

const RequestController = {
    getCloseContactFlag
}

export default RequestController;