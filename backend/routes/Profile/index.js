var express = require('express');
var router = express.Router();
var pool=require('../Pool');
var passport=require('../../modules/passport');


/*Show profile  FINISH*/
router.get('/api/ShowProfile', function (req, res, next) {
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
        //jwt id user user={id:'1',username:'tanthai'}
        //write code:
        //input:{na}
        const sqlProfile =`SELECT name,email,phone,mssv FROM account WHERE id=?`;

        pool.query(sqlProfile, [user.id], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
               res.json(result)  
            }
        });



    }
    )(req, res, next);
});



/*Update studentId FINISH*/
router.put('/api/UpdateProfile', function (req, res, next) {
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
        //jwt id user user={id:'1',username:'tanthai'}
        //write code:
        //input:{na}
        //input {mssv:'123456'} if trung thi trung roi else insert account
        const mssv =req.body.mssv;
        const sqlUpdate =`SELECT mssv FROM account WHERE mssv=?`;

        pool.query(sqlUpdate, [mssv], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                if(result.length) {
                    res.json({message:'existed'})
                }
                else {
                    const sqlInsert = `UPDATE account SET mssv=?
                    WHERE id=?`
                    pool.query(sqlInsert, [mssv,user.id], (error, result) => {
                        if (error) {
                            res.send(error);
                        }
                        else {
                            
                            res.json({message:'success'});
                        }

                    })
                }
                
            }
        });



    }
    )(req, res, next);
});


/*Change password FINISH*/
router.post('/api/ChangePassword', function (req, res, next) {
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
        const {currentPass,newPass} =req.body;

        const sqlCheckPass =`SELECT * FROM account WHERE password=?`;

        pool.query(sqlCheckPass, [currentPass], (error, resultCheckPass) => {
            if (error) {
                res.send(error);
            }
            else {
                if(resultCheckPass.length) {
                    const sqlUpdatePassword = `UPDATE account SET password=? WHERE id=?`;
                    pool.query(sqlUpdatePassword, [newPass,user.id], (error, result) => {
                        if (error) {
                            res.send(error);
                        }
                        else {
                            res.json({status:'success'});
                        }

                    });
                }
                else {
                    res.json({status:'notmatch'});
                }
                
            }
        });
    }
    )(req, res, next);
});

module.exports = router;
