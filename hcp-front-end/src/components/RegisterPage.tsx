import React from "react";
import { RouteComponentProps } from "@reach/router";
import * as MainController from "../controllers/MainController";

/**
 * Checks is password meets complexity requirements. Password should have at
 * least 8 characters. Password should have:
 * i) at least one upper case letter (A – Z).
 * ii) at least one lower case letter(a-z).
 * iii) At least one digit (0 – 9)
 * iv) at least one special Characters of !@#$%&*()
 * @param  {string} pass password to test
 * @return {boolean} true if meets complexity requirements, false otherwise
 */
function passwordMeetsComplexityRequirements(pass: string): boolean {
	const passExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
	return passExp.test(pass);
}

export const RegisterPage: React.FunctionComponent<RouteComponentProps> = () => {
	const [emailAddress, setEmailAddress] = React.useState<string>("");
	const [password, setPassword] = React.useState<string>("");
	const [validForm, setValidForm] = React.useState<boolean>(false);

	const onEmailAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmailAddress(event.target.value);
		setValidForm(event.target.value.includes('@') &&
			passwordMeetsComplexityRequirements(password));
	}

	const onPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
		setValidForm(passwordMeetsComplexityRequirements(event.target.value) &&
			emailAddress.includes('@'));
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
			<p>Password requirements:</p>
			<ol>
				<li>at least 8 characters</li>
				<li>at least one upper case letter (A – Z)</li>
				<li>at least one lower case letter(a-z)</li>
				<li>at least one digit (0 – 9)</li>
				<li>at least one special Characters of !@#$%&amp;*()</li>
			</ol>
		</>
	);
}
