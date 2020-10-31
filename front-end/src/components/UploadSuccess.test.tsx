import React from "react";
import { render, fireEvent, getByPlaceholderText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UploadForm from "./UploadForm";


// Will need to update these tests once the backend is setup
test("Upload success message being displayed",() => {
  const jwt = jest.requireActual('jsonwebtoken');
  const fs = jest.requireActual('fs');
  const pk = fs.readFileSync('../back-end/certificates/backend_key.pem');
  const { getByText, getByPlaceholderText } = render(<UploadForm/>);
  const inputField = getByPlaceholderText(/Please insert the token here/i);
  
  const token = jwt.sign({
    deviceId: '1234',
    hcpId: 'tempHCPID'
  }, pk, {algorithm: 'RS256', expiresIn: 60*30});

  userEvent.type(inputField, token);

  const submit = userEvent.click(getByText(/I consent to sharing my close contacts/i));

  // expect(getByText(/Your encounter data has been successfully uploaded!/i)).toBeInTheDocument();
});

// test("Closing the upload success message", () =>{
//   const { getByText, getByPlaceholderText, queryByText } = render(<UploadForm/>);
//   const inputField = getByPlaceholderText(/Please insert the token here/i);
  
//   userEvent.type(inputField, "TEST");
//   fireEvent.click(getByText(/I consent to sharing my close contacts/i));
//   fireEvent.click(getByText(/^Close Notification$/i));

//   expect(queryByText(/Your encounter data has been successfully uploaded!/i)).not.toBeInTheDocument();

// });
