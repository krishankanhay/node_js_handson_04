const Router = require('express').Router;
const router = Router();

const { RegisterFunction } = require('../Middleware/Register');
const { LoginFunction, refreshToken } = require('../Middleware/Login');
const { getEmail } = require('../Middleware/email');
const { forgetPassword, resetPassword } = require('../Middleware/forgetresetpwd');

router.post('/register', RegisterFunction);
router.post('/login', LoginFunction);
router.get('/fetch', getEmail);
router.get('/refresh', refreshToken);
router.post('/forgetPassword', forgetPassword);
router.put('/resetPassword', resetPassword);

module.exports = {
    router,
}







