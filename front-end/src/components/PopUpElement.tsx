import React from "react";

function PopUpElement({type, onPopUpClick}){
  
  function closePopUp() {
    console.log("CLOSE POP UP");
    onPopUpClick();
  };

  return(
    <div className={`${type?"is-clipped":""}`}>
      {type && <div className={`modal ${type?"is-active":""}`}>
        <div className="modal-background" onClick={closePopUp}></div>
          <div className="modal-content">
            {type === "upload-success" && <section className="section">
              <div className="box">
                <h1 className="title"> 
                  Your encounter data has been successfully uploaded.
                </h1>
                <h2 className="subtitle">
                  Thank you for helping us to make your community safer.
                </h2>
              </div>
            </section>}
          </div>
        <button className="modal-close is-large" aria-label="close" onClick={closePopUp}></button>
      </div>}
    </div>
  );
}

export default PopUpElement;