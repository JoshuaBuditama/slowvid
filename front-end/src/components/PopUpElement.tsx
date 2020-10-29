import React from "react";
import UploadSuccess from "../components/UploadSuccess";

function PopUpElement({type, onPopUpClick}){
  
  function closePopUp() {
    onPopUpClick();
  };

  return(
    <div className={`${type?"is-clipped":""}`}>
      {type && <div className={`modal ${type?"is-active":""}`}>
        <div className="modal-background"></div>
          <div className="modal-content">
            {type === "upload-success" && <section className="section has-text-centered">
              <UploadSuccess onPopUpClick={closePopUp}></UploadSuccess>
            </section>}
          </div>
        <button className="modal-close is-large" aria-label="close"></button>
      </div>}
    </div>
  );
}

export default PopUpElement;