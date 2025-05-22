const { USER_DATA } = require("../dataFile/UserData");
const { createToken, verifyToken } = require("../JWTFolder/jwt");
const { sendMail } = require("../NodeMailer/mailer");
const bcrypt = require('bcrypt');

function HashPassword(password) {
    const saltRound = 10;
    return bcrypt.hashSync(password, saltRound);
}

async function forgetPassword(request, response) {
    const user_info = request.body;
    // console.log('body -> ', user_info); // ----
    let user_found = null;
    for (const each_user of USER_DATA) {
        if (each_user.email == user_info.email) {
            user_found = each_user;
        }
    }
    // console.log('user_found -> ', user_found);  // -----
    if (user_found == null) {
        return response.status(400).send('user is not registered');
    }

    const forgetPasswordToken = createToken({
        isForgetPassword: true,
        email: user_info.email,
    }, '15m');

    const reset_password_token = `http://localhost:8000/students/resetPassword?token_reset=${forgetPasswordToken}`

    const receiverEmail = user_info.email;
    const subject = "Please reset your password";
    const content = ` please reset your password using this link - ${reset_password_token}`;
    const is_mail_sent = await sendMail(receiverEmail, subject, content);
    // console.log(content);  // ----

    if (is_mail_sent == false) {
        return response.status(500).send('please try again! something is not correct');
    }
    return response.send('please check your registered email address for reset password link');
}


function resetPassword(request, response) {
    const newPassword = request.body.newPassword;
    const token = request.query.token_reset;

    const token_data = verifyToken(token);
    if (token_data == null) {
        return response.status(400).send("please send correct token");
    }
    // console.log(token_data);   // ------
    if (!token_data.isForgetPassword) {
        return response.status(400).send("please send correct forget-password token");
    }
    const forget_password_email = token_data.email;
    const user_index = USER_DATA.findIndex((each_user) => {
        return each_user.email == forget_password_email;
    })

    const newHashPassword = HashPassword(newPassword);
    USER_DATA[user_index].password = newHashPassword;
    return response.send('password updated, please try login now');
}

module.exports = {
    forgetPassword,
    resetPassword,
}






