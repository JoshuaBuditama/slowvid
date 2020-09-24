const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const verificationKeysSchema = new Schema({
    verificationKey: {
        type: String,
        required: true,
        unique: true,
    },
    }, {
        timestamps: true,
    }

);

const VerificationKeys = mongoose.model('VerificationKeys', verificationKeysSchema);

module.exports = VerificationKeys;