require('dotenv').config();
const db = require('./db/index.js');
const nodemailer = require('nodemailer');
const axios = require('axios');


// const nodemailer = require('nodemailer')

async function sendEmailReminder() {
    console.log('running email function')
    const url = `http://127.0.0.1:3000/v1/account/gmail/submit?access_token=${process.env.EMAILENGINE_AFG_GMAIL_ACCESS_TOKEN}`;

    const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const data = {
        "envelope": {
            "from": `${proess.env.PERSONAL_EMAIL_ADDRESS}`,
            "to": [
                `${process.env.PROFESSIONAL_EMAIL_ADDRESS}`
            ]
        },
        "from": {
            "name": process.env.APP_NAME,
            "address": `${proess.env.PERSONAL_EMAIL_ADDRESS}`
        },
        "to": [
            {
                "address": `${process.env.PROFESSIONAL_EMAIL_ADDRESS}`
            }
        ],
        "subject": "Don't forget to log the end of your viewing sessino",
        "text": "Did you  remember to log the end of your viewing session? Go over to shortcuts now to do so please",
        "locale": "en-US",
        "deliveryAttempts": 10,
        "dryRun": false
    };

    try {
        const response = await axios.post(url, data, {headers: headers});
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { sendEmailReminder }