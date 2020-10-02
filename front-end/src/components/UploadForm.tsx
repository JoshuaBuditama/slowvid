import React, { useState } from "react";

function UploadForm(){
  const [counter, setCounter] = useState(0);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCounter(counter+1);
    console.log(counter)
  }

  return (
    <div>
      {/**Header section*/}
      <section className="section is-medium has-text-centered">
        <div className="container">
          <h1 className="title">Sharing my close contacts with healthcare professional</h1>
          <h2 className="subtitle">
            Please enter the healthcare code provided to you by the healthcare professional
          </h2>
          
          {/*Upload Form*/}
          <form onSubmit={handleSubmit}>
            {/*Input column*/}
            <div className="columns is-centered">
              <div className="column is-half">
                <input 
                  className="input" 
                  type="text" 
                  placeholder="Please type the code here"
                  value={counter}
                />
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
                    />
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default UploadForm;