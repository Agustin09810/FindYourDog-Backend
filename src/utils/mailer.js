const nodemailer = require('nodemailer');
require('dotenv').config();

const user = process.env.MAILER_EMAIL;
const pass = process.env.MAILER_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
        user: user,
        pass: pass
    },tls: {
        rejectUnauthorized: false
    }
});

const sendConfirmationEmail = async (email, confirmationCode) => {
    try {
        console.log(email, confirmationCode);
        await transporter.sendMail({
            from: user,
            to: email,
            subject: 'Por favor, confirma tu cuenta de FYD',
            html: `<h1>Por favor, confirma tu cuenta de FYD</h1>
                   <p>Para confirmar tu cuenta, por favor, haz click en el siguiente enlace:</p>
                    <a href="https://mango-forest-05df0a410.2.azurestaticapps.net/confirm/${confirmationCode}">Confirmar cuenta</a>`
        });
    } catch (error) {
        throw {status: 500, message: error?.message || error, type: 'server error'};
    }
}

module.exports = { sendConfirmationEmail };

