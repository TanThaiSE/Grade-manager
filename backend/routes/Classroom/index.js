var express = require('express');
var router = express.Router();
var pool=require('../Pool');
var passport=require('../../modules/passport');



/*Create class FINISH */
router.post('/api/CreateClass', function (req, res, next) {
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
        let {name, description, room,link,coderoom,createat} =req.body;
        // let link=new Date();
        // let newLink=link.getTime();
        const sqlCreateClass = 'insert into classes (name,description,room,link,coderoom,creatorId,createat) values(?,?,?,?,?,?,?)'

        pool.query(sqlCreateClass, [name, description, room, link,coderoom,user.id,createat ], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                const sqlCreateClassAccount = "insert into classaccount (accountId,classId,role) values(?,LAST_INSERT_ID(),?)"
                pool.query(sqlCreateClassAccount, [user.id,"teacher"], (error, result) =>  {
                    if (error) {
                        res.send(error);
                    }
                    else {
                        res.json(result);
                    }
                })
                
            }
        });



    }
    )(req, res, next);
});

/*Get all list classroom with idPlayer  FINISH*/
router.get('/api/GetListClasses', function (req, res, next) {
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
        const sql = `SELECT name, description,room, link,coderoom FROM classes INNER JOIN classaccount ON classID=id
        WHERE accountId=?
        `
        pool.query(sql, [user.id], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                res.json(result);
            }
        });
    }
    )(req, res, next);
});

/*Get value detail classroom based on link */
router.get('/api/ShowDetailClass/:link', function (req, res, next) {
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
        const link = req.params.link;
        const sql = `SELECT name, description,room,link,coderoom  FROM classes WHERE link =?`
        
        pool.query(sql, [link], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                res.json(result);
            }
        });
    }
    )(req, res, next);



});


/*Get teachers in classroom based on link FINISH*/
router.get('/api/ShowListTeachers/:link', function (req, res, next) {
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
        const link = req.params.link;
        const sql = `SELECT A.name FROM classes C INNER JOIN classaccount CA ON C.id=CA.classId INNER JOIN account A
        ON A.id=CA.accountId  WHERE C.link=? and CA.role=?`
        
        pool.query(sql, [link,"teacher"], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                res.json(result);
            }
        });
    }
    )(req, res, next);

});

/*Get students in classroom based on link FINISH*/
router.get('/api/ShowListStudents/:link', function (req, res, next) {
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
        const link = req.params.link;
        const sql = `SELECT A.mssv ,A.name  FROM classes C INNER JOIN classaccount CA ON C.id=CA.classId INNER JOIN account A
        ON A.id=CA.accountId  WHERE C.link=? and CA.role=?`
        
        pool.query(sql, [link,"student"], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                res.json(result);
            }
        });
    }
    )(req, res, next);
});

/*Join classroom by link FINISH*/
router.post('/api/joinClassByLink', function (req, res, next) {
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
        const link = req.body.link;
        const parseLink = link.split('/');
        const classLink = parseLink[parseLink.length - 1];

        const sqlLink =`SELECT * FROM classes WHERE link =? or coderoom=?`
        
        pool.query(sqlLink, [classLink,classLink], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                if(result.length) {
                    const tem = result[0];
    
                    const sqlInsertClassAccount = `INSERT INTO classaccount (accountId,classId,role) VALUES(?,?,?)`;
                    pool.query(sqlInsertClassAccount, [user.id,tem.id,"student"], (error, result) => {
                        if (error) {
                            res.send(error);
                        }
                        else {
                            res.json({message:"Join success"});

                        }

                    })

                }
                else {
                    res.json({message:"Link does not exist"});
                }
               
            }
        });
    }
    )(req, res, next);

});



/*Get total classes */
router.get('/api/GetTotalClasses', function (req, res, next) {
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
            const sqladmin =`SELECT id,name,description,room,link,coderoom,createat from classes`;
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