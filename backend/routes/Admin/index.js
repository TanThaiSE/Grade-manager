const express = require('express');
const router = express.Router();
var pool=require('../Pool');
var passport=require('../../modules/passport');
router.post('/api/createadmin', function (req, res, next) {
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
        if (user.isadmin ==1) {
            const {username,password,email,name,phone,createat}=req.body
            const sqlinsert =`INSERT INTO account (username,password,email,name,phone,lockacc,isadmin,createat) values(?,?,?,?,?,?,?,?)`
            pool.query(sqlinsert,[username,password, email,name,phone,0,1,createat],(error, result) => {
                if (error){
                    res.json({message:'insert fail'});
                } 
                else{
                   res.json({message:"insert admin success"});
                }
       
               }
               
              );

        }
        else {
            res.json({message:"must not insert right"});
        }
        
    }
    )(req, res, next);
});



router.get('/api/viewadminlist', function (req, res, next) {
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
        if (user.isadmin ==1) {
            const sqladmin =`SELECT id,username,email,name,phone,createat FROM account WHERE isadmin=1`;
            pool.query(sqladmin,[],(error, result) => {
                
                if (error){
                    res.json({message:'get fail'});
                } 
                else{
                   res.json(result);
                }
       
               }
               
              );

        }
        else {
            res.json({message:"must not view right"});
        }
        
    }
    )(req, res, next);
});
module.exports = router;