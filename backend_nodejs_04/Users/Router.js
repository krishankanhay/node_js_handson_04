const Router = require('express').Router;
const router = Router();

const { RegisterFunction } = require('../Middleware/Register');
const { LoginFunction, refreshToken } = require('../Middleware/Login');
const { getEmail } = require('../Middleware/email');

router.post('/register', RegisterFunction);
router.post('/login', LoginFunction);
router.get('/fetch', getEmail);
router.get('/refresh', refreshToken)

module.exports = {
    router,
}







