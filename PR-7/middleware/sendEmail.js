const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'g-mail',
    port: 587,
    secure: false,
    auth: {
        user:"htlpal01@gmail.com",
        pass: "Hetal@Pal_1503"
    }
});

exports.sendEmail = async (message) => {
    let res = await transport.sendMail(message);
    console.log("Email Response: ",res);
    return res;
}