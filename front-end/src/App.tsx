import React from "react";
import { SessionWrapper, useSession } from "./state";
import { Router, Link } from "@reach/router";
import MainPage from "./pages/MainPage";
import NotificationPage from "./pages/NotificationPage";
import SignInPage from "./pages/SignInPage";
import UploadPage from "./pages/UploadPage";

function App() {
  const { myName } = useSession();
  return (
    <div className="App">
      <nav className="navbar" role="navigation">
        <div
          className="navbar-menu is-active"
          style={{ borderBottom: "1px solid lightgray" }}
        >
          <Link className="navbar-item" to="/">
            MainPage
          </Link>
          <Link className="navbar-item" to="notifications">
            NotificationPage
          </Link>
          <Link className="navbar-item" to="sign-in">
            SignInPage
          </Link>
          <Link className="navbar-item" to="upload">
            UploadPage
          </Link>
          <div className="navbar-item">
            <span className="tag">{myName}</span>
          </div>
        </div>
      </nav>
      <div className="container">
        <Router>
          <MainPage path="/" />
          <NotificationPage path="notifications" />
          <SignInPage path="sign-in" />
          <UploadPage path="upload" />
        </Router>
      </div>
    </div>
  );
}

export default function () {
  return (
    <SessionWrapper>
      <App></App>
    </SessionWrapper>
  );
}
