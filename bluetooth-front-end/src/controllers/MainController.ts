import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IBluetoothMsgDocument } from '../../../bluetooth-back-end/src/model/BluetoothMsgModel'

const http : AxiosInstance = axios.create({baseURL: 'http://localhost:3002/api'});

export const getMessages = async (): Promise<AxiosResponse<IBluetoothMsgDocument[]>> => {
	const res = http.get<IBluetoothMsgDocument[]>('/messages');
	return res;
};

const MainController = {
	getMessages,
};

export default MainController;
