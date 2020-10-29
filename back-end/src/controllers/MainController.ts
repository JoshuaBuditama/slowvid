import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HCPUserModel } from '../model/HCPUser';
import { UserModel } from '../model/User';
import * as Conf from '../Conf';

export const register = async (req: express.Request, res: express.Response) => {
	try {
		let user = await HCPUserModel.findOne({ emailAddress: req.body.emailAddress });
		if (user) {
			return res.status(400).json("Email already exists");
		} else {
			const newUser = new HCPUserModel({
				emailAddress: req.body.emailAddress,
				password: req.body.password
			});
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(newUser.password, salt);
			newUser.password = hash;
			await newUser.save();
			res.status(200).json(user);
		}
	} catch (err: any) {
		res.status(400).json("Error occured during register")
	}
}

export const login = async (req: express.Request, res: express.Response) => {
	const email = req.body.emailAddress;
	const password = req.body.password;
	try {
		const user = await HCPUserModel.findOne({ emailAddress: email });
		if (!user) {
			return res.status(404).json("Account not found");
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (isMatch) {
			const payload = {
				id: user._id,
				emailAddress: user.emailAddress
			};
			const token = jwt.sign(payload, Conf.jwtPrivateKey,
				{ expiresIn: Conf.jwtTokenExpiry, algorithm: 'RS256' });
			res.json({
				success: true,
				token: `Bearer ${token}`
			});
		}
	} catch (err: any) {
		res.status(400).json("Error occured during register")
	}
}

export const confirm = async (req: express.Request, res: express.Response) => {
	try {
		let user = await UserModel.findOne({ deviceId: req.body.deviceId });
		if (user) {
			user.closeContactFlag = true;
			await user.save();
			return res.status(200).json("success");
		} else {
			return res.status(404).json("Device not found");
		}
	} catch (err: any) {
		res.status(400).json("Error occured during confirm");
	}
}

const MainController = {
	register,
	login,
	confirm,
};

export default MainController;
