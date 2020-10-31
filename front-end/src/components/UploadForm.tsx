import React, { useState } from "react";
import UploadSuccess from "../components/UploadSuccess";
import MainController from "../controller/MainController"

function UploadForm(){
  const [verificationToken, setVerificationToken] = useState("");
  const [submitSuccess, setSubmitStatus] = useState(false);
  
  //Need to fix the validity checker
  function validToken() {
    // const validTokenCombination = /^[A-Z]+$/;
    // const validTokenLength = 4;
    // if(verificationToken.match(validTokenCombination) && verificationToken.length === validTokenLength)
    // {
    return true;
    // }
    // return false;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitStatus(false);
    try{
      MainController.submitToken(verificationToken)
      .then(result => {setSubmitStatus(true); setVerificationToken('')})
      .catch(err => {alert("Error occurred during token submission!"); setVerificationToken('');});
		} catch (err) {
      if(err instanceof Error){
          throw err.message || "Error occurred during token submission!";
      }
    }
    // if(validToken()){
    //   //send token to backend
    //   //if successful, display success message
    //   // console.log(MainController.createToken());
    //   // await MainController.submitToken();
    //   setSubmitStatus(true);
    // }
    // else {
    //   //display error pop-up message
    //   alert("Token not found!"); //can change this to a proper message similar to the success message
    // }
  }

  function handlePopUpClick(){
    setSubmitStatus(false);
  }
  return (
    <div>
      
      {/**Notification that appears when the token submission is successful*/}
      {submitSuccess && <div className="notification">
        <UploadSuccess onPopUpClick={handlePopUpClick}/>
      </div>}

      {/**Header section*/}
      {!submitSuccess &&
        <section className="section is-medium has-text-centered">
          <div className="container">
            <h1 className="title">Sharing my close contacts with health care professional</h1>
            <h2 className="subtitle">
              Please enter the health care code provided to you by the health care professional
            </h2>
            {/*Upload Form*/}
            <form onSubmit={handleSubmit}>
              {/*Input column*/}
              <div className="columns is-centered">
                <div className="column is-half">
                  <input 
                    className="input" 
                    type="text" 
                    placeholder="Please insert the token here"
                    onChange={e => setVerificationToken(e.target.value) }
                  />
                  {!validToken() && verificationToken && <p className="help is-danger">
                    Please insert a valid token
                  </p>}
                </div>
              </div>
        
              {/*Text below the text input*/}
              <h6 className="subtitle is-6">
                Only authorised health care professionals can provide a valid health care code
              </h6>
        
              <div className="columns is-centered">
                {/*Cancel button*/}
                <div className="column is-half">
                  <div className="field">
                    <p className="control">
                      <button className="button">
                        Cancel
                      </button>
                    </p>
                  </div>
                </div>
        
                {/*Submit button*/}
                <div className="column is-half">
                  <div className="field">
                    <p className="control">
                      <input
                        type="submit"
                        className="button is-link"
                        value="I consent to sharing my close contacts"
                        disabled={!validToken()}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      }
    </div>
  );
}

export default UploadForm;