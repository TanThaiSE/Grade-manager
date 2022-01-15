var express=require('express');
var router=express.Router();
var pool=require('./pool');
var passport = require('../modules/passport');
var nodemailer = require('nodemailer');

/*SendEmailTeacher FINISH */
router.post('/SendEmailTeacher',(req, res, next)=>{
    passport.authenticate("jwt", { session: false, }, function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.header({ "Access-Control-Allow-Origin": "*" });
            res.status(401);
            res.send({ message: info.message, success: false });
            return;
        }

        let {emailNguoiNhan,link}=req.body;
        const parseLink = link.split('/');
        const classLink = parseLink[parseLink.length - 1];
    
        let contentSend = `
        <p>Hi ${emailNguoiNhan}</p>
        <p>Please join to class with link: ${link}</p>
        <p>Please not share for anyone</p>
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
            to: `${emailNguoiNhan}`,
            subject: "Invited class",
            html: contentSend
        }
    
        transporter.sendMail(mailOptions, function (error, infor) {
            if(error){
                console.log('loi roi',error);
                return;
            }
            console.log('sent',infor.response);
            const sqlFindIdTeacher=`SELECT id from account where email=?`;
            pool.query(sqlFindIdTeacher,[emailNguoiNhan],(error,result)=>{
                if(error){
                    res.send(error);
                }
                else if(result.length){
                    let accountId=result[0].id;
                    const sqlFindIdClass=`SELECT id from classes where link=?`;
                    pool.query(sqlFindIdClass,[classLink],(error,result)=>{
                        if(error){
                            res.send(error);
                        }
                        else{
                            const sqlInsertClassAccount=`INSERT INTO classaccount (accountId,classId,role) values(?,?,?)`;
                            pool.query(sqlInsertClassAccount,[accountId,result[0].id,"teacher"],(error,result)=>{
                                if(error){
                                    res.send(error);
                                }
                                else{
                                    res.json({status:true,message:"Send success"});
                                }
                            });
                        }   
                    });
                }
                else{
                    res.json({status:false,message:"email not exist"});
                }
            });
            
        });

    }
    )(req, res, next);
})

/*SendEmailStudent FINISH */
router.post('/SendEmailStudent',(req, res, next)=>{
    passport.authenticate("jwt", { session: false, }, function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.header({ "Access-Control-Allow-Origin": "*" });
            res.status(401);
            res.send({ message: info.message, success: false });
            return;
        }

        let {emailNguoiNhan,link}=req.body;
        const parseLink = link.split('/');
        const classLink = parseLink[parseLink.length - 1];
    
        let contentSend = `
        <p>Hi ${emailNguoiNhan}</p>
        <p>Please join to class with link: ${link}</p>
        <p>Please not share for anyone</p>
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
            to: `${emailNguoiNhan}`,
            subject: "Invited class",
            html: contentSend
        }
    
        transporter.sendMail(mailOptions, function (error, infor) {
            if(error){
                console.log('loi roi',error);
                return;
            }
            console.log('sent',infor.response);
            const sqlFindIdStudent=`SELECT id from account where email=?`;
            pool.query(sqlFindIdStudent,[emailNguoiNhan],(error,result)=>{
                if(error){
                    res.send(error);
                }
                else if(result.length){
                    let accountId=result[0].id;
                    const sqlFindIdClass=`SELECT id from classes where link=?`;
                    pool.query(sqlFindIdClass,[classLink],(error,result)=>{
                        if(error){
                            res.send(error);
                        }
                        else{
                            const sqlInsertClassAccount=`INSERT INTO classaccount (accountId,classId,role) values(?,?,?)`;
                            pool.query(sqlInsertClassAccount,[accountId,result[0].id,"student"],(error,result)=>{
                                if(error){
                                    res.send(error);
                                }
                                else{
                                    res.json({status:true,message:"Send success"});
                                }
                            });
                        }   
                    });
                }
                else{
                    res.json({status:false,message:"email not exist"});
                }
            });
            
        });

    }
    )(req, res, next);
})



module.exports= router;