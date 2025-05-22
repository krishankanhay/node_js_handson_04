const { USER_DATA } = require("../dataFile/UserData");
const { verifyToken } = require("../JWTFolder/jwt");


function getEmail(request, response) {
    const token = request.headers.token_name;
    const user_data = verifyToken(token);

    if (user_data == null) {
        response.status(400).send("token is incorrect");
    }

    const user_name = user_data.name;
    const user_email = [];
    for (each_email of USER_DATA) {
        if (each_email.user == user_name) {
            user_email.push(each_email);
        }
    }
    // console.log("user email data = ", user_email.length); // ---
    return response.json(user_email);
}

module.exports = {
    getEmail,
}




