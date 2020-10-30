import axios, { AxiosInstance } from 'axios';

const http: AxiosInstance = axios.create({ baseURL: 'http://localhost:3000/user' });

// export const createToken = async () => {
//     try{
//         await http.get('/createToken')
//         .then(result => {console.log(result); return result})
//         .catch(error => {console.log(error); throw error});
//     } catch (err) {
//         if(err instanceof Error){
//             throw err.message || "Error occurred during token creation";
//         }
        
//     }
// };

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
//connect to front end
const MainController = {
    // createToken
    submitToken
};

export default MainController;