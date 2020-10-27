import React from "react";

function UploadSuccess({onPopUpClick}){
  function closeNotification()
  {
    onPopUpClick();
  }
  return(
    <div className="box">
      <h1 className="title"> 
        Your encounter data has been successfully uploaded!
      </h1>
      <h2 className="subtitle">
        Thank you for helping us to make your community safer.
      </h2>
      <h2 className="subtitle">
        Please press the 'Close Notification' button to remove this notification.
      </h2>
      <button className="button is-success" onClick={closeNotification}>Close Notification</button>
    </div>
  );
}

export default UploadSuccess;