require('dotenv').config();
const db = require('./db/index.js');

// const nodemailer = require('nodemailer')

function sendEmailReminder() {
    console.log('Please update your innfo')
    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'your-email@gmail.com',
    //         pass: 'your-password'
    //     }
    // });

    // let mailOptions = {
    //     from: 'your-email@gmail.com',
    //     to: email,
    //     subject: 'Update required',
    //     text: 'Dear user, please update your info...'
    // };

    // transporter.sendMail(mailOptions, (err, info) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });
}

module.exports = { sendEmailReminder }