const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactsLogSchema = new Schema({
    contactToken: {
        type: String,
    },
    user_id: {
        type: String,
    },
    }, {
        timestamps: true,
    }

);

const contactsLog = mongoose.model('contactsLog', contactsLogSchema);

module.exports = contactsLog;