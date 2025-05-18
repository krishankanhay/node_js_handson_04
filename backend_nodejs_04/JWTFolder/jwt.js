const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.SECRET_KEY

function createToken(data, expiresIn) {
    const token = jwt.sign(data, secretKey, { expiresIn });
    return token;
}

function verifyToken(token) {
    try {
        const token_data = jwt.verify(token, secretKey);
        return token_data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    createToken,
    verifyToken,
}

