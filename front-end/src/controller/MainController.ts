import axios, { AxiosInstance } from 'axios';

const http: AxiosInstance = axios.create({ baseURL: 'http://localhost:3000/user' });


export const submitToken = async (verificationToken: string) => {
  try {
    await http.post('/submitToken',
    {
      token: verificationToken
    });
    } catch (err) {
        if(err instanceof Error){
            throw err.message || "Error occurred during token creation";
         }
    }
};

const MainController = {
    submitToken
};

export default MainController;