import React from "react";

export const MainPage: React.FunctionComponent<{}> = () => {
	const [deviceId, setDeviceId] = React.useState<string>("");
	const [validForm, setValidForm] = React.useState<boolean>(false);

	const onChangeDeviceId = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDeviceId(event.target.value);
		setValidForm(event.target.value.length > 0);
	}

	const onSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
		event.preventDefault();
		setValidForm(false);

		setValidForm(true);
	}

	return (
		<>
			<p>Confirm user is POSITIVE to COVID-19:</p>
			<div>Device Id: </div><input type="text" value={deviceId} onChange={onChangeDeviceId} />
			<input type="submit" onClick={onSubmit} disabled={!validForm} />
		</>
	);
}
