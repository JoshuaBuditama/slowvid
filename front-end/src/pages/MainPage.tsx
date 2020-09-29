import React from "react";
import NameForm from "../components/NameForm";
import { RouteComponentProps } from "@reach/router";

function Home(props: RouteComponentProps) {
  return <NameForm />;
}

export default Home;
