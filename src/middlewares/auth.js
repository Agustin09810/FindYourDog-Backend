const fs = require('fs');

const jsonwebtoken = require('jsonwebtoken');

const RSA_PUBLIC_KEY = fs.readFileSync('src/keys-1/rsa_public.pem');


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