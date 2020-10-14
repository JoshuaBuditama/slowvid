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
          <div className="modal-content">
            {type === "upload-success" && <section className="section">
              <UploadSuccess></UploadSuccess>
            </section>}
          </div>
        <button className="modal-close is-large" aria-label="close" onClick={closePopUp}></button>
      </div>}
    </div>
  );
}

export default PopUpElement;