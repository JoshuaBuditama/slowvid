// import React from "react";
// import { RouteComponentProps } from "@reach/router";

// let Page = (props: RouteComponentProps) => <div>Sign in page goes here</div>;

// export default Page;

import React from "react";
import { RouteComponentProps } from "@reach/router";
import SignIn from "../components/Signin.js";

function notification (props: RouteComponentProps)
{
  return <SignIn />
}
export default notification;
