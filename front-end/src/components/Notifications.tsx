import React from "react";
import Warning from "../images/warning.jpg"

function Positive()
{
    return ( 
        <div className="columns is-vcentered"> 
            <div>
                <img src={Warning} alt="Warning" width="200" height="200" style={{marginLeft: "42%", marginTop: "10%"}}/> 
                <p className="is-size-3 has-text-centered">You have been in close contact with a person
                    who has COVID-19. Please <span style={{color: "red"}}><b>self isolate</b></span> and report to a <span style={{color: "red"}}><b>health
                    clinic</b></span> or a <span style={{color: "red"}}><b>health care professinal</b></span> </p>
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