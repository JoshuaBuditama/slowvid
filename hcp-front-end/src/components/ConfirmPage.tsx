import React from "react";
import { RouteComponentProps } from "@reach/router";
import * as MainController from "../controllers/MainController";

interface ConfirmPageProps extends RouteComponentProps {
	loggedIn: boolean;
}

export const ConfirmPage: React.FunctionComponent<ConfirmPageProps> = (props) => {
	const [deviceId, setDeviceId] = React.useState<string>("");
	const [validForm, setValidForm] = React.useState<boolean>(false);

	const onChangeDeviceId = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDeviceId(event.target.value);
		setValidForm(event.target.value.length > 0);
	}

	const onSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
		event.preventDefault();
		setValidForm(false);
		try {
			await MainController.confirm(deviceId);
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
			</>
			: <p>Not logged in</p>}
		</>
	);
}
