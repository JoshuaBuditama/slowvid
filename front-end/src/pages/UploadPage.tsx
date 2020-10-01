import React from "react";
import { RouteComponentProps } from "@reach/router";

let Page = (props: RouteComponentProps) => (
<body>
  {/**Container for the texts above the input box */}
  <section className="section is-medium has-text-centered">
    <div className="container">
      <h1 className="title">Sharing my close contacts with healthcare professional</h1>
      <h2 className="subtitle">
        Please enter the healthcare code provided to you by the healthcare professional
      </h2>
    </div>
  </section>
</body>
);

export default Page;
