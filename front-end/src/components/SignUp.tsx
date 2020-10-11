import React, { useState } from "react";

function SignUp(){
    const [phoneNum, setPhoneNum] = useState("");

    //check to see if the phone number is the correct length and only contains numbers
    function checkNum(){
        const reg = /^\d+$/;
        if(phoneNum.match(reg) && phoneNum.length === 10){
            return true;
        }
        else{
            return false;
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // if a valid phone num, send to back end
        console.log(checkNum());
        if(checkNum()){
            //send to back end to send SMS and authentication
           setPhoneNum(phoneNum);
        }
        else{
            //error handle, possibly create alert
        }
        
    }

    return(
        <div>
            <section className="section">
                <div className="container">
                    <h1 className="title">Sign In</h1>
                    <h2 className="subtitle"> Please provide your phone number to receive a sign in code</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="field is-centered is-half">
                            <input
                                className="input"
                                type="text"
                                placeholder="i.e. 0455555555"
                                onChange={ e => setPhoneNum(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="field">
                                <p>
                                    <input
                                        type="submit"
                                        className="button"
                                        value="Submit"
                                        disabled={!checkNum()}
                                    />
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default SignUp;
