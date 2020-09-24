const router = require('express').Router();

// models
let VerificationKeys = require('../models/verificationKeys.model');


router.route('/').get((req, res) => {
    VerificationKeys.find()
        .then(verification_keys => res.json(verification_keys))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/insertVerificationKeys').post(async (req, res) => {
    try {
        const verificationKey = req.body.verificationKey;

        //store into db
        const newVerificationKeys = new VerificationKeys({ verificationKey });
        await newVerificationKeys.save()
            .then(() => res.json('Key added'))
            .catch(err => res.status(400).json('Error: ' + err));


    } catch (error) {
        res.status(500).send(error);
    }
});