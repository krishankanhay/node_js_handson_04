const { USER_DATA } = require("../dataFile/UserData");
const bcrypt = require('bcrypt');

function HashPassword(password) {
    const saltRound = 10;
    return bcrypt.hashSync(password, saltRound);
}

function RegisterFunction(request, response) {
    const user_info = request.body;
    user_info.password = HashPassword(user_info.password);
    USER_DATA.push(user_info);
    console.log(user_info); // ---
    response.status(201).json("User successfully registered");
}


module.exports = {
    RegisterFunction,
}



