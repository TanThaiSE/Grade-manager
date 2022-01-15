var express=require('express');
var router=express.Router();
var passport=require('./index');
var jwt = require('jsonwebtoken');

router.post('/',passport.authenticate('local',{session:false}),(req, res, next)=>{
    res.json({
        success:true,
        content:req.user,
        tokenAccess:jwt.sign({
            id:req.user.id,
            username:req.user.username,
            isadmin:req.user.isadmin
        },
        process.env.jwt_secret,
        { expiresIn:'5h'})
    });
});

router.get("/abc", function (req, res, next) {
    passport.authenticate(
      "jwt",
      {
        session: false,
      },
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          res.header({ "Access-Control-Allow-Origin": "*" });
          res.status(401);
          res.send({ message: info.message, success: false });
          return;
        }
        //jwt id user
        
        console.log(user)
      }
    )(req, res, next);
  });

module.exports = router;