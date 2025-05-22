const nodemailer = require('nodemailer');

async function sendMail(receiverEmail, subject, content) {

    try { 
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rohitkumar5kk55@gmail.com',
                pass: 'qqfpyehfkysfnbmv'
            }
        });

        const mail_options = {
            from: 'rohitkumar5kk55@gmail.com',
            to: receiverEmail,
            subject,
            text: content,
        };
        const info = await transporter.sendMail(mail_options);

        // console.log('Email sent: ' + info.response);  // -----
        
    } catch (err) {
        console.log(err);
        return false;
    }

    return true;
} 

module.exports = {
    sendMail,
    
}


