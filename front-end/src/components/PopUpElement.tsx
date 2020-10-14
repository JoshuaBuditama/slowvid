import React from "react";
import UploadSuccess from "../components/UploadSuccess";

function PopUpElement({type, onPopUpClick}){
  
  function closePopUp() {
    onPopUpClick();
  };

  return(
    <div className={`${type?"is-clipped":""}`}>
      {type && <div className={`modal ${type?"is-active":""}`}>
        <div className="modal-background" onClick={closePopUp}></div>
          <div className="modal-content" onClick={closePopUp}>
            {type === "upload-success" && <section className="section has-text-centered">
              <UploadSuccess></UploadSuccess>
            </section>}
          </div>
        <button className="modal-close is-large" aria-label="close" onClick={closePopUp}></button>
      </div>}
    </div>
  );
}

export default PopUpElement;