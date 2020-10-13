// import React from "react";
// import { RouteComponentProps } from "@reach/router";

// let Page = (props: RouteComponentProps) => <div>Sign in page goes here</div>;

// export default Page;

import React from "react";
import { RouteComponentProps } from "@reach/router";
import SignIn from "../components/Signin.js";
// import SignUp from "../components/SignUp";

function SignInPage(props: RouteComponentProps){
  return <SignIn />;
//   return <SignUp />;
}
export default SignInPage;
