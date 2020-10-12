import React from "react";
// refer https://www.health.gov.au/sites/default/files/documents/2020/04/covidsafe-app-faqs-coronavirus-contact-app-covidsafe-faqs.pdf
function TOS() {
    return (
        <div>
            <section className="section">
                <div className="container">
                    <h1 className="title"><b>Terms of service</b></h1>
                    <h5 className="is-size-5">By accessing the App I accept and understand to the following terms:</h5>
                    <br></br>
                    <ol>
                        <li>When a person registers the app, verified mobile number, 
                            are registered and encrypted on the highly secure information storage system. 
                            They are provided an encrypted hash code, which is the only data shared as part of the Bluetooth ‘digital handshake’.</li>
                        <li>The digital handshakes collected by the contact app are stored locally on the user’s phone.</li>
                        <li>Contact information only leaves the users phone if the user is diagnosed as having coronavirus.  </li>
                        <li>This information is securely encrypted and stored on the phone.</li>
                        <li>Contacts that are older than 21 days are automatically deleted from the phone</li>
                        <li>The information is uploaded to a highly secure information storage system. Only authorised
                            state and territory health officials will have access to the contact information. State and
                            territory health officials will only have access to view the contact information collected by
                            people from their state or territory diagnosed with COVID-19. </li>
                        <li>In accessing and using the uploaded data, health officials will be required to comply with the
                            Australian Privacy Principles and all applicable data protection and information security
                            obligations. It will only be able to be used for alerting individuals if they have come into
                            contact with a person who has contracted coronavirus. </li>
                    </ol>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                        <a href='sign-in' style={{ textDecoration: 'none', fontSize: 22 }}>
                            <u>back</u>
                            </a>

                </div>
                </div>
            </section>
        </div>
    );

}


export default TOS;