const router = require('express').Router();

// models
let User = require('../models/user.model');
let VerificationKeys = require('../models/verificationKeys.model');

//encryption algorithm
const Bcrypt = require("bcryptjs");
const e = require('express');


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// http://localhost:5000/users/register
router.route('/register').post(async (req, res) => {
    try {
        p("1");
        var validateName = await User.findOne({ username: req.body.username }).exec();
        // check name have been used or not
        if (validateName) {
            res.status(400).send({ message: "The username has been registered" });
        } else {
            // check OTP
            // if OTP === true





            // then register

            // hash the phone number
            const phoneNumber = Bcrypt.hashSync(req.body.phoneNumber, 10);
            const username = req.body.username;
            const typeOfUser = "general";
            const verification = false;

            //store into db
            const newUser = new User({ username, phoneNumber, typeOfUser, verification });
            await newUser.save()
                .then(() => res.json('You have successfully registered'))
                .catch(err => res.status(400).json('Error: ' + err));
        }

    } catch (error) {
        res.status(500).send(error);
    }
});

// http://localhost:5000/users/login
router.route('/login').post( async (req, res) => {
    try {
        var user = await User.findOne({ username: req.body.username }).exec();

        // user not exist
        if (!user) {
            return res.status(400).send({ message: "The username does not exist" });
        }
        // compare login phoneNumber with hashed phoneNumber
        if (!Bcrypt.compareSync(req.body.phoneNumber, user.phoneNumber)) {
            return res.status(400).send({ message: "The password is invalid" });
        }
        res.send({ message: "You have successfully login" });
    } catch (error) {
        res.status(500).send(error);
    }
});


// http://localhost:5000//verifyPositive/:id

router.route('/verifyPositive/:id').post( async (req, res) => {
    p(req.params.id);
    try {
        p(req.body.verificationKey);
        // request verification key from front-end
        // then search VerificationKeys collection in database
        var verifyPositive = await VerificationKeys.findOne({ verificationKey: req.body.verificationKey }).exec();
        p(verifyPositive);

        //if can't find verification key database 
        if(!verifyPositive){
            return res.status(400).send({ message: "Incorrect verification key" });
        }
        // correct verification key
        else{ 

            User.findById(req.params.id)
            .then(user => {
                user.typeOfUser = "Positive";
                user.verification = true;

                user.save()
                    .then(() => res.json('Verified and updated status !'))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
        }
        

    } catch (error) {
        res.status(500).send(error);
    }
});

router.route('/upload/:id').post((req, res) => {
    try {
        



    } catch (error) {
        res.status(500).send(error);
    }

});



// short form console.log
function p(val) {
    console.log(val);
}



module.exports = router;

