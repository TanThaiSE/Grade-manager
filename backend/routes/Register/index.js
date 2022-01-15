var express = require('express');
var router = express.Router();
var pool = require('../Pool');
var passport = require('../../modules/passport');
var { v4: uuidv4 } = require('uuid');
var nodemailer = require('nodemailer');

require('dotenv').config();
var URL_FRONTEND=process.env.URL_FRONTEND;
var URL_BACKEND=process.env.URL_BACKEND;
/*Create account */
router.post('/', function (req, res, next) {
    const { username, password, email, name, phone,createat } = req.body;
    let emailVerify = uuidv4();
    // res.json({message:process.env.URL_BACKEND});
    const sqlRegister = "INSERT INTO account (username,password,email,name,phone,emailVerify,lockacc,isadmin,createat) values(?,?,?,?,?,?,?,?,?)";
    pool.query(sqlRegister, [username, password, email, name, phone, emailVerify,0,0,createat], (error, result) => {
        if (error) {
            res.json({status:false, message: 'registerfail' });
        }
        else {
            let contentSend = `
            <p>Hi ${name}</p>
            <p>Please click here to verify your account</p>
            <a href='${URL_FRONTEND}/verifyemail/${emailVerify}'>Verify your account</a>
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
                subject: "Verify account",
                html: contentSend
            }
        
            transporter.sendMail(mailOptions, function (error, infor) {
                if(error){
                    console.log('loi sent register roi',error);
                    return;
                }
                console.log('sent register',infor.response);
                
            });

            res.json({status:true, message: 'registersuccess' });
        }
    }
    );

});


router.post('/api/verifyemail', function (req, res, next) {
    let {emailToken}=req.body;
    let sqlFindUser=`SELECT id from account where emailVerify=?`;
    pool.query(sqlFindUser,[emailToken], (error, result) => {
        if (error) {
            res.json({status:false, message: 'verifyemail' });
        }
        else if(result.length){
            let sqlIsVerify=`UPDATE account SET emailVerify='' WHERE id=?`;
            pool.query(sqlIsVerify,[result[0].id], (error, result) => {
                if (error) {
                    res.json({status:false, message: 'verifyemail' });
                }
                else{
                    res.json({status:true,message:'Verify email success!'});
                }
            })
        }
        else{
            res.json({status:false,message:'account not exits!'});
        }
    })
});
module.exports = router;