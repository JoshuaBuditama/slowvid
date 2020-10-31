import React from 'react';
import {
    Paper,
    TextField,
    // MenuItem,
    Button,
    IconButton
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import axios from 'axios';

import Otp from './Otp.js';
import history from './history';

function isNumeric(n) {
    return !isNaN(parseInt(n)) && isFinite(n);
}


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            pno: '',
            otpShow: false,
            otp: '',
            time: {},
            seconds: 60
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }
    _getCode = async () => {
        try {
            this.setState({ seconds: 60, time: this.secondsToTime(60) });
            const e = this.state.code + this.state.pno;
            await axios.get("http://localhost:8000/verify/getcode", {
                params: {
                    phonenumber: e,
                    channel: 'sms'
                }
            })
        } catch (error) {
            console.log(error)
        }
    };


    _verifyCode = async () => {
        try {
            const e = this.state.code + this.state.pno;
            const value = await axios.get("http://localhost:8000/verify/verifycode", {
                params: {
                    phonenumber: e,
                    code: this.state.otp
                }
            })
            if (JSON.stringify(value.data.valid) === true) {
                alert("This phone number was successfully verified, moving to the home page.");
            } else {
                alert("Oops! Wrong OTP.");
            }
        } catch (error) {
            alert("Oops! Wrong OTP.");
        }




    }
    tohome = () => {
        history.push('/');
    }


    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
        }
    }



    render() {
        return (
            <div>
                <h1 className="title" style={{ margin: 20 }}>Sign In</h1>
                <Paper elevation={4} style={{ padding: 20, width: 300, marginBottom: 60 }}>
                    {
                        !this.state.otpShow ?
                            <h3 style={{ marginLeft: 10, color: '#9f9f9f' }}>Verification</h3> :
                            <IconButton disabled={this.state.time.s > 0}
                                onClick={() => { this.setState({ otpShow: false, otp: '', seconds: 60, time: this.secondsToTime(60) }); }}
                                size="small">
                                <ArrowBackIcon />
                            </IconButton>
                    }
                    {
                        !this.state.otpShow ?
                            <h3>Enter your Phone Number</h3> :
                            <h3>Enter the OTP</h3>
                    }
                    {
                        this.state.otpShow ?
                            <p>A One Time Password has been sent to your phone number for verification puposes.</p> :
                            null
                    }
                    <div>
                        {
                            !this.state.otpShow ?
                                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto', justifyContent: 'space-around' }}>

                                    <div style={{ alignItems: 'flex-end', justifyContent: 'center', display: 'flex', marginRight: 10, width: 60 }}>
                                        <TextField placeholder="eg. +61" id="code" label="Code" color="secondary" value={this.state.code}
                                            inputProps={{ maxLength: 4 }}
                                            onChange={e => {
                                                this.setState({ code: e.target.value });
                                            }} />
                                    </div>
                                    <div>
                                        <TextField placeholder="eg. 0412 345 678" id="phone" label="Phone" color="secondary" value={this.state.pno}
                                            onChange={e => {
                                                if ((e.target.value[e.target.value.length - 1] >= '0' && e.target.value[e.target.value.length - 1] <= '9') || !e.target.value) {
                                                    this.setState({ pno: e.target.value });
                                                }
                                            }} />
                                    </div>
                                </div> :
                                <Otp otp={this.state.otp} setOtp={val => this.setState({ otp: val })} />
                        }
                        {
                            this.state.otpShow ?
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 5 }}>
                                    Didn't receive an OTP?
                                    <Button
                                        variant="contained"
                                        disabled={this.state.time.s > 0}
                                        style={{
                                            color: 'white',
                                            marginLeft: 'auto',
                                            textTransform: 'none'
                                        }}
                                        color="primary"
                                        onClick={() => {
                                            this._getCode();
                                            this.setState({seconds: 60, time:this.secondsToTime(60)});
                                            this.startTimer();
                                        }
                                    } 
                                    >
                                        Resend
                                    </Button>
                                    <div style={{ marginLeft: 5 }}>
                                        {this.state.time.s}s
                                    </div>
                                </div> :
                                null
                        }
                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                            <Button
                                variant="contained"
                                disabled={(this.state.pno.length !== 10) || (this.state.code === null) || !isNumeric(this.state.pno) || (this.state.otpShow && this.state.otp.length !== 6)}
                                color="secondary"
                                style={{
                                    color: 'white',
                                    marginLeft: 'auto',
                                    textTransform: 'none'
                                }}
                                onClick={() => {
                                    if (this.state.otpShow) {
                                        this._verifyCode();
                                    } else {
                                        this._getCode();
                                        this.startTimer();
                                        this.setState({ otpShow: true });
                                    }
                                }}>
                                Verify
                            </Button>
                        </div>
                        {
                            !this.state.otpShow ?
                                <p>By tapping Verify an SMS may be sent.</p> :
                                null
                        }

                    </div>
                </Paper>
            </div>
        );
    }
}