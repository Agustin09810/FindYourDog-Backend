const nodemailer = require('nodemailer');
require('dotenv').config();

const user = process.env.MAILER_EMAIL;
const pass = process.env.MAILER_PASSWORD;
const service = process.env.MAILER_SERVICE || 'gmail'; // Default to Gmail

// Configuration for different email services
const getTransporterConfig = () => {
    switch(service.toLowerCase()) {
        case 'gmail':
            return {
                service: 'gmail',
                auth: {
                    user: user,
                    pass: pass // App password for Gmail
                }
            };
        case 'outlook':
        case 'outlook365':
            return {
                service: 'Outlook365',
                auth: {
                    user: user,
                    pass: pass
                },
                tls: {
                    rejectUnauthorized: false
                }
            };
        default:
            return {
                service: 'gmail',
                auth: {
                    user: user,
                    pass: pass
                }
            };
    }
};

const transporter = nodemailer.createTransport(getTransporterConfig());

const sendConfirmationEmail = async (email, confirmationCode) => {
    try {
        console.log(`Sending confirmation email to: ${email}`);
        console.log(`Using email service: ${service}`);
        
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200';
        
        await transporter.sendMail({
            from: user,
            to: email,
            subject: 'Por favor, confirma tu cuenta de FYD',
            html: `<h1>Por favor, confirma tu cuenta de FYD</h1>
                   <p>Para confirmar tu cuenta, por favor, haz click en el siguiente enlace:</p>
                   <a href="${frontendUrl}/confirm/${confirmationCode}">Confirmar cuenta</a>
                   <p>Si no puedes hacer click en el enlace, copia y pega esta URL en tu navegador:</p>
                   <p>${frontendUrl}/confirm/${confirmationCode}</p>`
        });
        
        console.log('✅ Email sent successfully');
        
    } catch (error) {
        console.error('❌ Error sending email:', error.message);
        throw {status: 500, message: error?.message || error, type: 'server error'};
    }
}

module.exports = { sendConfirmationEmail };

