import React from "react";
import { RouteComponentProps } from "@reach/router";
import * as MainController from "../controllers/MainController";

interface ConfirmPageProps extends RouteComponentProps {
	loggedIn: boolean;
}

export const ConfirmPage: React.FunctionComponent<ConfirmPageProps> = (props) => {
	const [deviceId, setDeviceId] = React.useState<string>("");
	const [validForm, setValidForm] = React.useState<boolean>(false);
	const [signedJWT, setSignedJWT] = React.useState<string>("");

	const onChangeDeviceId = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDeviceId(event.target.value);
		setValidForm(event.target.value.length > 0);
	}

	const onSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
		event.preventDefault();
		setValidForm(false);
		try {
			const result = await MainController.confirm(deviceId)
			setSignedJWT(result.data.verificationToken);
			alert("Confirm successful");
		} catch (e: any) {
			alert(e);
		} finally {
			setValidForm(true);
		}
	}

	return (
		<>{props.loggedIn ?
			<>
				<p>Confirm user is POSITIVE to COVID-19:</p>
				<div>Device Id: </div><input type="text" value={deviceId} onChange={onChangeDeviceId} />
				<input type="submit" onClick={onSubmit} disabled={!validForm} />
		{signedJWT && <p>Please enter this token in the patient's device to start the contact log upload process: {signedJWT}</p>}
			</>
			: <p>Not logged in</p>}
		</>
	);
}
