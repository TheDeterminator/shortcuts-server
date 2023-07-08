require('dotenv').config();
const db = require('./db/index.js');

// const nodemailer = require('nodemailer')

function sendEmailReminder(email) {
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

async function pollDatabaseAndSendEmail() {
    // const res = await db.query("SELECT * FROM your_table WHERE your_condition");
    console.log('update fap entry')
    // if (res.rows.length > 0) {
    //     // If the condition is met, send email
    //     const email = res.rows[0].email;
    //     sendEmailReminder(email);
    // } else {
    //     // If the condition is no longer met, clear the interval
    //     clearInterval(intervalId);
    // }
}

module.exports = {pollDatabaseAndSendEmail, sendEmailReminder}