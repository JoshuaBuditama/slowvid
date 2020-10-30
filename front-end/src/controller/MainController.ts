import axios, { AxiosInstance, AxiosResponse } from 'axios';

const http: AxiosInstance = axios.create({ baseURL: 'http://localhost:4000/api' });

export const createToken = async (): Promise<AxiosResponse> => {
	return await http.get('/createToken');
};

//connect to front end
const MainController = {
    createToken
};

export default MainController;