import React from 'react';
import { Router, Link } from "@reach/router";
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ConfirmPage } from './components/ConfirmPage';
import './App.css';

function App() {
	const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

	return (
		<div className="App">
			<nav className="navbar" role="navigation">
				<div
					className="navbar-menu is-active"
					style={{ borderBottom: "1px solid lightgray" }}>
					<Link className="navbar-item" to="/">
						Login
					</Link>
					&nbsp;
					<Link className="navbar-item" to="register">
						Register
					</Link>
					&nbsp;
					{loggedIn ?
						<Link className="navbar-item" to="confirm">
							Confirm User
						 </Link>
						: null}
				</div>
			</nav>
			<Router>
				<LoginPage path="/" setLoggedIn={setLoggedIn} />
				<RegisterPage path="register" />
				<ConfirmPage path="confirm" loggedIn={loggedIn} />
			</Router>
		</div>
	);
}

export default App;
