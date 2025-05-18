const { USER_DATA } = require("../dataFile/UserData");
const bcrypt = require('bcrypt');
const { createToken, verifyToken } = require("../JWTFolder/jwt");

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

    const login_token = createToken({
        name: user_found.name,
        email: user_found.email,
    }, '3m');

    const refresh_token = createToken({
        isRefreshToken: true,
        name: user_found.name,
        email: user_found.email,
    }, '2d');

    return response.json({
        message: "User has logged in succeessfully",
        login_token,
        refresh_token,
    });
}


function refreshToken(request, response) {
    const refreshtoken = request.headers.refresh_token_head;
    const USER_DATA = verifyToken(refreshtoken);
    if (USER_DATA == null) {
        return response.send("please login again");
    }

    if (!USER_DATA.isRefreshToken) {
        return response.send("please send refresh token only");
    }

    const login_token = createToken({
        name: USER_DATA.name,
        email: USER_DATA.email,
    }, '3m');

    return response.json({
        login_token
    });
}


module.exports = {
    LoginFunction,
    refreshToken,
}





