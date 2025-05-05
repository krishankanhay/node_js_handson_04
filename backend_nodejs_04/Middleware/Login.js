const { USER_DATA } = require("../dataFile/UserData");
const bcrypt = require('bcrypt');

function CheckPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

function LoginFunction(request, response) {
    const login_info = request.body;
    let user_found = null;
    for (const each_user of USER_DATA) {
        if (each_user.email == login_info.email) {
            user_found = each_user;
        }
    }
    if (user_found == null) {
        return response.status(400).send("user is not registered");
    }
    const isPasswordCorrect = CheckPassword(login_info.password, user_found.password);
    console.log(user_found.password); // ---
    if (!isPasswordCorrect) {
        return response.status(400).send('password is not correct');
    }
    return response.send("User has logged in succeessfully")
}


module.exports = {
    LoginFunction,
}





