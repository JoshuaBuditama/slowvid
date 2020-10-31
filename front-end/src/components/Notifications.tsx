import React from "react";
import Warning from "../images/warning.jpg"
import exmark from "../images/EXmark.png"
import {useSession} from "../state"

function Positive()
{
    return ( 
        <div className="columns is-vcentered" style={{width: "90%", marginLeft: "5%"}}> 
            <div>
                <img src={Warning} alt="Warning" width="100" height="100" style={{marginLeft: "35%", marginTop: "10%"}}/> 
                <p className="is-size-5 has-text-centered" style={{width: "95%", marginLeft: "3%"}}>You have been in close contact with a person
                    who has COVID-19. Please <span style={{color: "red"}}><b>self isolate</b></span> and report to a <span style={{color: "red"}}><b>health
                    clinic</b></span> or a <span style={{color: "red"}}><b>health care professinal</b></span> </p>
                <br></br>
                <h1 className="is-size-5 has-text-centered" >Quarantine at home and watch for symptoms for 14 days:</h1>
                <ol >
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
            </div>
        </div>
    );

}

function Negative()
{
    return ( 
        <div className="columns is-vcentered" style={{width: "100%"}}> 
            <div>
                <img src={exmark} alt="no Notification" width="150" height="150" style={{marginLeft: "30%", marginTop: "30%", opacity: 0.4}}/> 
                <h2 className="is-size-4 has-text-centered" style={{width: "95%", marginLeft: "8%"}}>
                    No new Notifications.
                </h2>
                <br></br>
                <p className="is-size-6 has-text-centered" style={{width: "100", marginLeft: "8%"}}>
                    If you come in close contact with someone with COVID-19, you will be notified here!
                </p>
                
            </div>
        </div>
    );

}

function Notify()
{
    if(useSession().closeContactFlag)
    {
        return ( <Positive/> );
    }
    else
    {
        return ( <Negative/>);
    }
}

export default Notify;