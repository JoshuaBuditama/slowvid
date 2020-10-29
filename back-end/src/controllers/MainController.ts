import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HCPUserModel } from '../model/HCPUser';
import { UserModel } from '../model/User';

export const register = async (req: express.Request, res: express.Response) => {
	HCPUserModel.findOne({ emailAddress: req.body.emailAddress })
		.then(user => {
			if (user) {
				let error = 'Email Address Exists in Database.';
				return res.status(400).json(error);
			} else {
				const newUser = new HCPUserModel({
					emailAddress: req.body.emailAddress,
					password: req.body.password
				});
				bcrypt.genSalt(10, (err, salt) => {
					if (err) throw err;
					bcrypt.hash(newUser.password, salt,
						(err, hash) => {
							if (err) throw err;
							newUser.password = hash;
							newUser.save().then(user => res.json(user))
								.catch(err => res.status(400).json(err));
						});
				});
			}
		});

};

export const login = async (req: express.Request, res: express.Response) => {
	const email = req.body.emailAddress;
	const password = req.body.password;
	HCPUserModel.findOne({ emailAddress: email })
		.then(user => {
			if (!user) {
				return res.status(404).json("No Account Found");
			}
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if (isMatch) {
						const payload = {
							id: user._id,
							emailAddress: user.emailAddress
						};
						jwt.sign(payload, "secret", { expiresIn: 36000 }, //TODO
							(err, token) => {
								if (err) res.status(500)
									.json({
										error: "Error signing token",
										raw: err
									});
								res.json({
									success: true,
									token: `Bearer ${token}`
								});
							});
					} else {
						res.status(400).json("Password is incorrect");
					}
				});
		});
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
