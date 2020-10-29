import React, { MouseEvent } from "react";
import { useSession } from "../state";

function ConsentPage() {
  const { setConsentProvided } = useSession();

  function consentClicked(event: MouseEvent<HTMLButtonElement>) {
    console.log(event);
    setConsentProvided(true);
  }

  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 className="is-size-3">Consent Required</h1>
      <p>
        By clicking 'I Agree' below, you provide consent for the Slowvid
        application to broadcase a bluetooth signal containing information that
        may uniquely identify your device.
      </p>
      <br />
      <p>
        No personally identifiable contact information will be stored or shared
        by this application, ever.
      </p>

      <br />
      <p>If you do not agree, please close and uninstall this application.</p>
      <br />
      <button className="button is-success" onClick={consentClicked}>
        I Agree
      </button>
    </div>
  );
}

export default ConsentPage;
