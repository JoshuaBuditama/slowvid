import axios, { AxiosInstance } from 'axios';

const http: AxiosInstance = axios.create({ baseURL: 'http://localhost:3000/api' });
export let authBearer: string;

export const register = async (emailAddress: string, password: string) => {
	try {
		await http.post('/register', {
			emailAddress: emailAddress,
			password: password,
		});
	} catch (err: any) {
		console.log(err);
	}
};

export const login = async (emailAddress: string, password: string): Promise<boolean> => {
	try {
		const res = await http.post('/login', {
			emailAddress: emailAddress,
			password: password,
		});
		authBearer = res.data.token;
		return true;
	} catch (err: any) {
		return false;
	}
};

export const confirm = async (deviceId: string): Promise<boolean> => {
	try {
		const res = await http.post('/confirm', {
			deviceId: deviceId,
		}, {
			headers:
				{ Authorization: authBearer }
		});
		console.log(res);
		return true;
	} catch (err: any) {
		return false;
	}
};
