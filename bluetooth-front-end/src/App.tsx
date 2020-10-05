import React from 'react';
import './App.css';
import { MessageList } from './components/MessageList';
import { ProximityList } from './components/ProximityList';

function App() {
	return (
		<div className="App">
			<MessageList />
			<ProximityList />
		</div>
	);
}

export default App;
