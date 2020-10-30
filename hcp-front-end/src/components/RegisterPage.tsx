import React from "react";
import { RouteComponentProps } from "@reach/router";
import * as MainController from "../controllers/MainController";

export const RegisterPage: React.FunctionComponent<RouteComponentProps> = () => {
	const [emailAddress, setEmailAddress] = React.useState<string>("");
	const [password, setPassword] = React.useState<string>("");
	const [validForm, setValidForm] = React.useState<boolean>(false);

	const onEmailAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmailAddress(event.target.value);
		setValidForm(event.target.value.length > 0 && event.target.value.includes('@'));
	}

	const onPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
		setValidForm(event.target.value.length > 0);
	}

	const onSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
		event.preventDefault();
		setValidForm(false);
		try {
			await MainController.register(emailAddress, password);
			alert("Register successful");
		} catch (e: any) {
			alert(e);
		} finally {
			setValidForm(true);
		}
	}

	return (
		<>
			<p>Register:</p>
			<div>Email: </div><input type="text" value={emailAddress} onChange={onEmailAddress} />
			<div>Password: </div><input type="password" value={password} onChange={onPassword} />
			<input type="submit" onClick={onSubmit} disabled={!validForm} />
		</>
	);
}
