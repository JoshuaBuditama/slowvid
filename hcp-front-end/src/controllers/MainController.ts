import axios, { AxiosInstance, AxiosResponse } from 'axios';

const http: AxiosInstance = axios.create({ baseURL: 'https://localhost:4000/api' });
export let authBearer: string;

export const register = async (emailAddress: string, password: string) => {
	try {
		await http.post('/register', {
			emailAddress: emailAddress,
			password: password,
		});
	} catch (err: any) {
		throw err.response?.data || "Error occured during register";
	}
};

export const login = async (emailAddress: string, password: string) => {
	try {
		const res = await http.post('/login', {
			emailAddress: emailAddress,
			password: password,
		});
		authBearer = res.data.token;
	} catch (err: any) {
		throw err.response?.data || "Error occured during login";
	}
};

export const confirm = async (deviceId: string): Promise<AxiosResponse> => {
	try {
		let result = await http.post('/confirm', {
			deviceId: deviceId,
			hcpId: "tempHCPID" // Will need to find a way to get the actual HCP ID 
		}, {
			headers:
				{ Authorization: authBearer }
		})
		return result;
	} catch (err: any) {
		throw err.response?.data || "Error occured during confirm";
	}
};
