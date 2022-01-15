var express = require('express');
var router = express.Router();
var pool=require('./pool');
var passport=require('../modules/passport');
/*Identify Role in Class FINISH */
router.get('/api/IdentifyRole/:link', function(req, res, next) {
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
        let link=req.params.link;
        const sql = `SELECT CA.role FROM classes C INNER JOIN classaccount CA ON C.id=CA.classId INNER JOIN account A
        ON A.id=CA.accountId  WHERE C.link=? and CA.accountId=?`;
        pool.query(sql,[link,user.id],(error,result)=>{
            if(error){
                res.send(error);
            }
            else{
                res.json(result);
                
            }   
        });
    }
    
    )(req, res, next);
})

module.exports = router;