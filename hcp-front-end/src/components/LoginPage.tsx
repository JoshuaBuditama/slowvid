import React from "react";
import { RouteComponentProps, Link } from "@reach/router";
import * as MainController from "../controllers/MainController";

interface LoginPageProps extends RouteComponentProps {
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginPage: React.FunctionComponent<LoginPageProps> = (props) => {
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
			await MainController.login(emailAddress, password);
			props.setLoggedIn(true);
			alert("Login successful");
		} catch (e: any) {
			props.setLoggedIn(false);
			alert(e);
		} finally {
			setValidForm(true);
		}
	}

	return (
		<>
			<p>If you don't have an account, please <Link to="register">register</Link> before logging in.</p>
			<p>Login:</p>
			<div>Email: </div><input type="text" value={emailAddress} onChange={onEmailAddress} />
			<div>Password: </div><input type="password" value={password} onChange={onPassword} />
			<input type="submit" onClick={onSubmit} disabled={!validForm} />
		</>
	);
}
