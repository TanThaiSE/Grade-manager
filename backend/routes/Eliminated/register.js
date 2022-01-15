var express=require('express');
var router=express.Router();
var pool=require('./pool');
var passport=require('../modules/passport');

/*Create account */  
router.post('/', function(req, res, next) {
    const {username, password,email, name, phone}=req.body;
    const sqlRegister  ="INSERT INTO account (username,password,email,name,phone) values(?,?,?,?,?)";
    pool.query(sqlRegister,[username,password, email,name,phone],(error, result) => {
         if (error){
             res.json({message:'registerfail'});
         } 
         else{
            res.json({message:'registersuccess'});
         }

        }
        
       );

});



module.exports= router;