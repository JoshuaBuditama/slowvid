const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);


exports.getCode = async (req, res) => {
    console.log("getCode ================================+>")
    console.log(req.query.phonenumber);
    client
        .verify
        .services(process.env.VERIFY_SERVICE_SID)
        .verifications
        .create({
            to: `+${req.query.phonenumber}`,
            channel: req.query.channel
        })
        .then(data => {
            console.log(data)
            res.status(200).send(data)
        })
        .catch(err=>console.log(err));
};


exports.verifyCode = async (req, res, err) => {
    console.log("verifcode ================================+>")
    client
        .verify
        .services(process.env.VERIFY_SERVICE_SID)
        .verificationChecks
        .create({
            to: `+${req.query.phonenumber}`,
            code: req.query.code
        })
        .then(data => {
            console.log(data)
            res.status(200).send(data);
        })
        
        ;
};