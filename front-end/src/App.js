import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { SessionWrapper } from "./state";
import NameForm from "./components/NameForm.js";
import Header from "./components/Header.js";

function App() {
  return (
    <SessionWrapper>
      <div className="App">
        <Header />
        <img src={logo} className="App-logo" alt="logo" />
        <h2>SlowVid</h2>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <NameForm />
      </div>
    </SessionWrapper>
  );
}

export default App;
