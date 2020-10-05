import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IBluetoothMsgDocument } from '../../../bluetooth-back-end/src/model/BluetoothMsgModel';
import { IBluetoothProximity, IBluetoothProximityDocument } from '../../../bluetooth-back-end/src/model/BluetoothProximityModel';

const http: AxiosInstance = axios.create({ baseURL: 'http://localhost:3002/api' });

export const getMessages = async (): Promise<AxiosResponse<IBluetoothMsgDocument[]>> => {
	return await http.get<IBluetoothMsgDocument[]>('/messages');
};

export const addProximity = async (prox: IBluetoothProximity): Promise<AxiosResponse<IBluetoothProximityDocument>> => {
	return await http.post<IBluetoothProximity, AxiosResponse<IBluetoothProximityDocument>>('/addproximity', prox);
};

const MainController = {
	getMessages,
	addProximity,
};

export default MainController;
