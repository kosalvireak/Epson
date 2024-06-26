// const nodemailer = require('nodemailer');
// const { google } = require('googleapis');

// const oAuth2Client = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLEINT_SECRET,
//     REDIRECT_URI
// );
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// const transport = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         type: 'OAuth2',
//         user: 'virakvary@gmail.com',
//         clientId: CLIENT_ID,
//         clientSecret: CLEINT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         accessToken: ACCESS_TOKEN,
//     },
// });

// module.exports.sendResetPasswordMail = async (user) => {
//     try {
//         const mailUser = {
//             from: 'Business Intelligence Admin',
//             to: user,
//             subject: 'Reset Password Pending.',
//             text: 'You have successfully request to reset the password of your account in Business Intelligence Application.\nIf you need more assist you can contact directly to virakvary@gmail.com',
//         };

//         const mailAdmin = {
//             from: 'Business Intelligence Admin',
//             to: 'virakvary@gmail.com',
//             subject: 'User Request Reset Password.',
//             text: `The user ${user} want to reset their account password.`,
//         };

//         const resultUser = await transport.sendMail(mailUser);

//         const resultAdmin = await transport.sendMail(mailAdmin);

//         return true;
//     } catch (error) {
//         console.error("Error sending mail:", error.message);
//         return error;
//     }
// }

// module.exports.sendNewPasswordMail = async (user, password) => {
//     try {
//         const mailUser = {
//             from: 'Business Intelligence Admin',
//             to: user,
//             subject: 'Reset Password Successfully.',
//             text: `Your new password is ${password} \nIf you need more assist you can contact directly to virakvary@gmail.com`,
//         };

//         const resultUser = await transport.sendMail(mailUser);

//         return true;
//     } catch (error) {
//         console.error("Error sending mail:", error.message);
//         return error;
//     }
// }