import express from 'express';
import {UserModel} from '../model/User';

export const getCloseContactFlag = async (req: express.Request, res: express.Response<boolean>) =>
{
    try
    {
        const user = await UserModel.findOne({deviceId: req.body.deviceId}).exec();
        if(user)
        {
            return res.status(200).json(user.closeContactFlag);
        }
        else
        {
            return res.status(200).json(false);
        }
    }
    catch
    {
        res.status(400).json(false);
    }
}

const RequestController = {
    getCloseContactFlag
}

export default RequestController;