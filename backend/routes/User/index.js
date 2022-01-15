const express = require('express');
const router = express.Router();
var pool=require('../Pool');
var passport=require('../../modules/passport');
router.get('/api/viewuserlist', function (req, res, next) {
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
            const sqladmin =`SELECT id,username,email,name,phone,createat,lockacc,mssv FROM account WHERE isadmin=0`;
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


router.post('/api/lockandunlockacc', function (req, res, next) {
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
        let {idacc,lockacc} = req.body;
        let x = lockacc==0?1:0;
        if (user.isadmin ==1) {
            const sqladmin =`UPDATE account
            SET lockacc = ?
            WHERE id=?`;
            pool.query(sqladmin,[x,idacc],(error, result) => {
                if (error){
                    res.json({message:' fail'});
                } 
                else{
                    res.json({message:"succes "});
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

router.put('/api/mapping', function (req, res, next) {
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
        let { id, mssvupdate } = req.body;
        if (user.isadmin == 1) {
            const sqldup = `SELECT mssv FROM account WHERE mssv=?`;
            pool.query(sqldup, [mssvupdate], (error, result) => {
                if (error) {
                    res.json({ message: ' fail' });
                }
                else {
                    if (result.length > 0) {
                        res.json({ message: "student id does exit" });
                    }
                    else {
                        const sqlupdate = `UPDATE account
                        SET mssv = ?
                        WHERE id=?`;
                        pool.query(sqlupdate, [mssvupdate,id], (error, result) => {
                            if (error) {
                                res.json({ message: ' fail' });
                            }
                            else {
                                res.json({ message: "mapping success" });
                            }

                        }

                        );


                    }
                }

            }

            );

        }
        else {
            res.json({ message: "must not map right" });
        }

    }
    )(req, res, next);
});


router.put('/api/unmapping', function (req, res, next) {
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
        let { id } = req.body;
        if (user.isadmin == 1) {
            const sqladmin = `UPDATE account
            SET mssv = ?
            WHERE id=?`;
            pool.query(sqladmin, ['', id], (error, result) => {
                if (error) {
                    res.json({ message: ' fail' });
                }
                else {
                    res.json({ message: "succes " });
                }

            }

            );

        }
        else {
            res.json({ message: "must not unmap right" });
        }

    }
    )(req, res, next);
});

module.exports = router;