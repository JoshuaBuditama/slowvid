import React from "react";
import Warning from "../images/warning.jpg"

function Positive()
{
    return ( 
        <div className="columns is-vcentered"> 
            <div>
                <img src={Warning} alt="Warning" width="100" height="130" style={{marginLeft: "38%", marginTop: "10%"}}/> 
                <p className="is-size-3 has-text-centered">You have been in close contact with a person
                    who has COVID-19. Please <span style={{color: "red"}}><b>self isolate</b></span> and report to a <span style={{color: "red"}}><b>health
                    clinic</b></span> or a <span style={{color: "red"}}><b>health care professinal</b></span> </p>
                <br></br>
                <h1 className="is-size-3">Quarantine at home and watch for symptoms for 14 days:</h1>
                <ol>
                    <li>Watch for symptoms, even if mild, of cough, shortness of breath or difficulty breathing, fever,
                    chills, repeated shaking with chills, fatigue, muscle pain or body aches, headache, sore
                    throat, new loss of taste or smell, congestion or runny nose, nausea or vomiting, or diarrhea.</li>
                    <li>Don’t leave home, except to get medical care. Wear a cloth mask if you need to leave home.</li>
                    <li>Call ahead before visiting a health care provider or emergency department. </li>
                    <li>If possible, stay in a specific room in your home and use a separate bathroom. </li>
                    <li>Stay at least six feet or two meters away from others in your home at all times. Wear a cloth
                    mask if you’re in any room with other people, unless you have trouble breathing. Don’t share
                    household items. </li>
                    <li>Stay connected with others – use technology to communicate with friends and family. </li>
                </ol>  
                <div style={{  justifyContent: 'center', marginTop: 10,marginLeft:20 }}>
                <a href='upload' style={{ textDecoration: 'none', fontSize: 40 }}>Report your case!</a>
            </div>
            </div>
            
        </div>
    );

}

function Notify()
{
    return ( <Positive/>
        );
}

export default Notify;