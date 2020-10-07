import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IBluetoothMsgDocument } from '../../../bluetooth-back-end/src/model/BluetoothMsgModel';
import { IBluetoothProximity, IBluetoothProximityDocument } from '../../../bluetooth-back-end/src/model/BluetoothProximityModel';

const http: AxiosInstance = axios.create({ baseURL: 'http://localhost:3002/api' });

export const getMessages = async (): Promise<AxiosResponse<IBluetoothMsgDocument[]>> => {
	return await http.get<IBluetoothMsgDocument[]>('/messages');
};

export const deleteMessages = async (): Promise<AxiosResponse> => {
	return await http.get('/deletemessages');
};

export const getProximities = async (): Promise<AxiosResponse<IBluetoothProximityDocument[]>> => {
	return await http.get<IBluetoothProximityDocument[]>('/proximities');
};

export const addProximity = async (prox: IBluetoothProximity): Promise<AxiosResponse<IBluetoothProximityDocument>> => {
	return await http.post<IBluetoothProximity, AxiosResponse<IBluetoothProximityDocument>>('/addproximity', prox);
};

export const deleteProximities = async (): Promise<AxiosResponse> => {
	return await http.get('/deleteproximities');
};

const MainController = {
	getMessages,
	deleteMessages,
	getProximities,
	addProximity,
	deleteProximities,
};

export default MainController;
