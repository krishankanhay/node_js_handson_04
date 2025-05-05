const Router = require('express').Router;
const router = Router();

const { RegisterFunction } = require('../Middleware/Register');
const { LoginFunction } = require('../Middleware/Login');

router.post('/register', RegisterFunction);
router.post('/login', LoginFunction);

module.exports = {
    router,
}







