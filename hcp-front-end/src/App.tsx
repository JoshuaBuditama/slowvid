import React from 'react';
import { MainPage } from './components/MainPage';
import './App.css';
import axios, { AxiosInstance } from 'axios';

function App() {

	const http: AxiosInstance = axios.create({ baseURL: 'https://localhost:4433/' });

	const getMessages = async () => {
		console.log(await http.get('/authenticate'));
	};
	getMessages();

  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
