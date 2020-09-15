import React from "react";
import logo from "./logo.svg";
import { SessionWrapper } from "./state";
import Header from "./components/Header";
import NameForm from "./components/NameForm";
import "./App.css";

function App() {
  return (
    <SessionWrapper>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Header />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <NameForm />
        </header>
      </div>
    </SessionWrapper>
  );
}

export default App;
