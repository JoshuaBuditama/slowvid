import React from "react";
import { SessionWrapper, useSession } from "./state";
import { Router, Link } from "@reach/router";
import MainPage from "./pages/MainPage";
import NotificationPage from "./pages/NotificationPage";
import SignInPage from "./pages/SignInPage";
import UploadPage from "./pages/UploadPage";
import history from './components/history';
import ConsentPage from "./pages/ConsentPage";
import DeviceMock from "./components/DeviceMock";


function Nav() {

  return (
      <nav className="navbar" role="navigation">
        <div
          className="navbar-menu is-active"
          style={{ borderBottom: "1px solid lightgray" }}
        >
          <div className="navbar-item" style={{"fontWeight":"bold"}} >
            Demo controls:
          </div>

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

          <button className="button mt-2" onClick={()=>localStorage.clear()} >
            Clear LocalStorage
          </button>
        </div>
      </nav>
    //   <div className="container">
    //     <Router history={history}>
    //       <MainPage path="/" />
    //       <NotificationPage path="notifications" />
    //       <SignInPage path="sign-in" />
    //       <UploadPage path="upload" />
    //     </Router>
    //   </div>
    // </div>
  );
}

function App() {
  const { consentProvided } = useSession();

  if (consentProvided) {
    return (
      <div className="App">
        <Nav />
        <div>
          <DeviceMock>
            <Router>
              <MainPage path="/" />
              <NotificationPage path="notifications" />
              <SignInPage path="sign-in" />
              <UploadPage path="upload" />
            </Router>
          </DeviceMock>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Nav />
        <div>
          <DeviceMock>
              <ConsentPage />
          </DeviceMock>
        </div>
      </div>
    );
  }
  }

export default function () {
  return (
    <SessionWrapper>
      <App></App>
    </SessionWrapper>
  );
}
