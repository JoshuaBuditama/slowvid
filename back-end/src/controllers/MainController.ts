import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { WebToken } from '../model/Verification';
import { HCPUserModel } from '../model/HCPUser';
import { UserModel } from '../model/User';
import { VerificationTokenModel } from '../model/VerificationToken';
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
			const token = jwt.sign(payload, Conf.httpsOptions.key,
				{ expiresIn: Conf.jwtTokenExpiry, algorithm: 'RS256' });
			return res.json({
				success: true,
				token: `Bearer ${token}`
			});
		} else {
			return res.status(404).json("Incorrect password");
		}
	} catch (err: any) {
		res.status(400).json("Error occured during register")
	}
}

export const confirm = async (req: express.Request, res: express.Response) => {
	try {
		let user = await UserModel.findOne({ deviceId: req.body.deviceId });
		let hcp = await HCPUserModel.findOne({ hcpId: req.body.hcpId });
		let token = WebToken.setToken(req.body.deviceId, req.body.hcpId); // creating the JWT token
		if (user && hcp) {
			user.closeContactFlag = true;
			await user.save();

			//creating new verification token entry in the database
			const newToken = new VerificationTokenModel({
				value: token
			});

			// save the new verification token
			await newToken.save();
			return res.status(200).json({message: "success", verificationToken: token});
		} else {
			return res.status(404).json("Device not found");
		}
	} catch (err: any) {
		res.status(400).json("Error occured during confirm");
	}
}

export const submitToken = async (req: express.Request, res: express.Response) => {
	try{
		console.log("HURRAY");
		console.log(req.body);
		return res.status(200).json("Successful token submission!");
	} catch (err: any) {
		res.status(400).json("Error occurred during token creation process");
	}
    // var verificationToken = "temp";
    // var token = WebToken.setToken(verificationToken, "placeholderHCPID"); // add placeholder string until we get HCP ID properly
    // console.log(token); // HCP should show the token to the patient
}

// export const createToken = async (req: express.Request, res: express.Response) => {
// 	try{
// 		console.log("HURRAY");
// 		console.log(req.body);
// 		return res.status(200).json("create token success");
// 	} catch (err: any) {
// 		res.status(400).json("Error occurred during token creation process");
// 	}
//     // var verificationToken = "temp";
//     // var token = WebToken.setToken(verificationToken, "placeholderHCPID"); // add placeholder string until we get HCP ID properly
//     // console.log(token); // HCP should show the token to the patient
// }
const MainController = {
	register,
	login,
	confirm,
	submitToken
};

export default MainController;
