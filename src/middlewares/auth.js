require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');

// Fix RSA public key processing
let RSA_PUBLIC_KEY = process.env.PUBLIC_KEY;

if (RSA_PUBLIC_KEY) {
    RSA_PUBLIC_KEY = RSA_PUBLIC_KEY
        .replace(/-----BEGINPUBLICKEY-----/g, '-----BEGIN PUBLIC KEY-----')
        .replace(/-----ENDPUBLICKEY-----/g, '-----END PUBLIC KEY-----')
        .replace(/\\n/g, '\n');
}

function authValidate (req, res, next) {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jsonwebtoken.verify(token, RSA_PUBLIC_KEY, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            req.userData = decoded;
            next();
        });
    } else {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}

module.exports = {authValidate};