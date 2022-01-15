var express = require('express');
var router = express.Router();
var pool = require('../Pool');
var passport = require('../../modules/passport');
var { v4: uuidv4 } = require('uuid');
var nodemailer = require('nodemailer');


/*Forgot account */
router.post('/', function (req, res, next) {
    const { email } = req.body;
    let newPassword = uuidv4();
    const sqlGetPass = "SELECT id from account where email=? ";
    pool.query(sqlGetPass, [email], (error, result) => {
        if (error) {
            res.json({ status: false, message: 'getpassword failed' });
        }
        else if (result.length) {
            let sqlUpdatePassword = `UPDATE account SET password =? WHERE id=?`;
            pool.query(sqlUpdatePassword, [newPassword, result[0].id], (error, result) => {
                if (error) {
                    res.json({ status: false, message: 'sqlUpdatePassword failed' });
                }
                else {
                    let contentSend = `
                    <p>Hi ${email}</p>
                    <p>New password is: ${newPassword}</p>
                    <p>Please not share with anyone</p>
                    <p>Thank you!</p>`;
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: `tanthai172k@gmail.com`,
                            pass: `manchester666A`
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    });

                    let mailOptions = {
                        from: `tanthai172k@gmail.com`, // sender address
                        to: `${email}`,
                        subject: "Reset password",
                        html: contentSend
                    }

                    transporter.sendMail(mailOptions, function (error, infor) {
                        if (error) {
                            console.log('loi sent forgot password roi', error);
                            return;
                        }
                        console.log('sent forgot password', infor.response);
                    });

                    res.json({ status: true, message: 'Please check email to get password' });
                }
            });
        }
        else {
            res.json({ status: false, message: 'Email not exits. Please check again!' });
        }
    }
    );

});
module.exports = router;