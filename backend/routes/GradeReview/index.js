const express = require('express');
const router = express.Router();
var pool = require('../Pool');
var passport = require('../../modules/passport');
router.get('/api/getAllComments/:link/:idassiment', function (req, res, next) {
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
        let link = req.params.link;
        let idass = req.params.idassiment;
        let sqlRole = `SELECT CA.role FROM classes C INNER JOIN classaccount CA ON C.id=CA.classId INNER JOIN account A
        ON A.id=CA.accountId  WHERE C.link=? and CA.accountId=?`;
        pool.query(sqlRole, [link, user.id], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                if (result[0].role === "teacher") {

                    let sqlTeacher = `SELECT * FROM comment C WHERE C.assignmentId=?`
                    pool.query(sqlTeacher, [idass], (error, result1) => {
                        if (error) {
                            res.send(error);
                        }
                        else {
                            res.json(result1);
                        }
                    });

                }
                else if (result[0].role === "student") {
                    const sqlStudent = `SELECT C.id,C.comment,C.username,C.accountId,C.parentid,C.createat,C.assignmentId,C.finalgrade
                    from comment C INNER JOIN grade G on G.assignmentId=C.assignmentId
                                   INNER JOIN assignment Ass ON Ass.id=G.assignmentId
                                   INNER JOIN classes cl ON cl.id=Ass.classId
                                   INNER JOIN classaccount cla ON (cla.classId=cl.id and C.accountId=cla.accountId)
                                   INNER JOIN account A ON (A.mssv =G.mssv and A.id=cla.accountId)
                                   WHERE cl.link=? and Ass.id=? and cla.accountId=? and C.parentid=?
                    `
                    pool.query(sqlStudent, [link, idass, user.id, 0], (error, result1) => {
                        if (error) {
                            res.send(error);

                        }
                        else {
                            let sqlchildren = `SELECT * FROM comment  WHERE parentid in
                            (SELECT C.id
                                from comment C INNER JOIN grade G on G.assignmentId=C.assignmentId
                                   INNER JOIN assignment Ass ON Ass.id=G.assignmentId
                                   INNER JOIN classes cl ON cl.id=Ass.classId
                                   INNER JOIN classaccount cla ON (cla.classId=cl.id and C.accountId=cla.accountId)
                                   INNER JOIN account A ON (A.mssv =G.mssv and A.id=cla.accountId)
                                   WHERE cl.link=? and Ass.id=? and cla.accountId=? and C.parentid=?)
                            `;
                            pool.query(sqlchildren, [link, idass, user.id, 0], (error, result2) => {
                                if (error) {
                                    res.send(error);
                                }
                                else {
                                    let finalResult = result1.concat(result2);
                                    res.json(finalResult);

                                }
                            });

                        }
                    });
                }
            }
        });
    }
    )(req, res, next);
});

router.post('/api/addComment', function (req, res, next) {
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
        let { comment, parentid, createat, assignmentId, finalgrade, link, role } = req.body;
        const sqlInsertComment = `INSERT INTO comment (comment,username,accountId,parentid,createat,assignmentId,finalgrade)
         VALUES (?,?,?,?,?,?,?);`

        pool.query(sqlInsertComment, [comment, user.username, user.id, parentid, createat, assignmentId, finalgrade], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                if (parentid == 0) {//When first time create grade reviewer by student
                    const sqlFindTeacher = `SELECT ca.accountId,ca.classId FROM classaccount ca WHERE ca.role='teacher' and ca.classId IN (
                       SELECT cl.id FROM classes cl where cl.link=?)`;
                    pool.query(sqlFindTeacher, [link], (error, resFindTeacher) => {
                        if (error) {
                            res.send(error);
                        }
                        else {
                            for (let i = 0; i < resFindTeacher.length; i++) {
                                let sqlInsertNotifi = `INSERT INTO notification (classId,senderId,recipientId,notice,typeNotification) VALUES (?,?,?,?,?)`;
                                pool.query(sqlInsertNotifi, [resFindTeacher[i].classId, user.id, resFindTeacher[i].accountId, comment, 'gradereview'], (error, resInsertNotifi) => {
                                    if (error) {
                                        res.send(error);
                                    }
                                });
                            }
                            res.json({ message: 'add comment and notification success' });
                        }

                    });

                }
                else {
                    if (role == 'teacher') {
                        const sqlFindOrigin = `SELECT accountId from comment where id=?`;
                        pool.query(sqlFindOrigin, [parentid], (error, resultAccId) => {
                            if (error) {
                                res.send(error);
                            }
                            else {
                                const sqlFindClassId = `SELECT id FROM classes  where link=?`;
                                pool.query(sqlFindClassId, [link], (error, resClassId) => {
                                    if (error) {
                                        res.send(error);
                                    }
                                    let sqlInsertNotifi = `INSERT INTO notification (classId,senderId,recipientId,notice,typeNotification) VALUES (?,?,?,?,?)`;
                                    pool.query(sqlInsertNotifi, [resClassId[0].id, user.id, resultAccId[0].accountId, comment, 'gradereview'], (error, resInsertNotifi) => {
                                        if (error) {
                                            res.send(error);
                                        }
                                        res.json({ message: 'add comment and notification success' });
                                    });
                                });

                            }
                        });
                    }

                    else if (role == 'student') {
                        const sqlFindTeacher = `SELECT DISTINCT accountId FROM comment where parentid=? and accountId !=?`;
                        pool.query(sqlFindTeacher, [parentid, user.id], (error, resultAccId) => {
                            if (error) {
                                res.send(error);
                            }
                            else {
                                const sqlFindClassId = `SELECT id FROM classes  where link=?`;
                                pool.query(sqlFindClassId, [link], (error, resClassId) => {
                                    if (error) {
                                        res.send(error);
                                    }
                                    for (let i = 0; i < resultAccId.length; i++) {
                                        let sqlInsertNotifi = `INSERT INTO notification (classId,senderId,recipientId,notice,typeNotification) VALUES (?,?,?,?,?)`;
                                        pool.query(sqlInsertNotifi, [resClassId[0].id, user.id, resultAccId[0].accountId, comment, 'gradereview'], (error, resInsertNotifi) => {
                                            if (error) {
                                                res.send(error);
                                            }
                                        });
                                    }
                                    res.json({ message: 'add comment and notification success' });

                                });

                            }
                        });
                    }

                }

            }


        });

    }
    )(req, res, next);
});

router.post('/api/addFinalDecision', function (req, res, next) {
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
        let { link, comment, parentid, createat, assignmentId, finalgrade } = req.body;
        const sqlrole = `SELECT CA.role FROM classes C INNER JOIN classaccount CA ON C.id=CA.classId INNER JOIN account A
        ON A.id=CA.accountId  WHERE C.link=? and CA.accountId=? 
        `;
        pool.query(sqlrole, [link, user.id], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                if (result[0].role === "teacher") {
                    const sqlinsert = `INSERT INTO comment (comment,username,accountId,parentid,createat,assignmentId,finalgrade)
                    VALUES (?,?,?,?,?,?,?)
                    `
                    pool.query(sqlinsert, [comment, user.username, user.id, parentid, createat, assignmentId, finalgrade], (error, result1) => {
                        if (error) {
                            res.send(error);
                        }
                        else {
                            const sqlIdCmt = `SELECT * FROM comment WHERE id=LAST_INSERT_ID()`;
                            pool.query(sqlIdCmt, [], (error, result2) => {
                                if (error) {
                                    res.send(error);
                                }
                                else {
                                    const sqlparent = `SELECT * FROM comment WHERE id=?`;
                                    pool.query(sqlparent, [result2[0].parentid], (error, result3) => {
                                        if (error) {
                                            res.send(error);
                                        }
                                        else {
                                            if (result3[0].finalgrade == -1) {
                                                const updatefinal = `UPDATE comment
                                                SET finalgrade =? WHERE id =? `
                                                pool.query(updatefinal, [finalgrade, result3[0].id], (error, result4) => {
                                                    if (error) {
                                                        res.send(error);
                                                    }
                                                    else {
                                                        const sqlmssv = `SELECT  DISTINCT G.mssv from
                                                        comment C INNER JOIN grade G ON G.assignmentId=C.assignmentId
                                                               INNER JOIN account A ON G.mssv=A.mssv
                                                               WHERE A.id=?
                                                        `
                                                        pool.query(sqlmssv, [result3[0].accountId], (error, result5) => {
                                                            if (error) {
                                                                res.send(error);
                                                            }
                                                            else {

                                                                const updategrade = `UPDATE grade
                                                                SET grade =? WHERE mssv=? and assignmentId=?`;
                                                                pool.query(updategrade, [finalgrade, result5[0].mssv, assignmentId], (error, result6) => {
                                                                    if (error) {
                                                                        res.send(error);
                                                                    }
                                                                    else {
                                                                        const sqlFindOrigin = `SELECT accountId from comment where id=?`;
                                                                        pool.query(sqlFindOrigin, [parentid], (error, resultAccId) => {
                                                                            if (error) {
                                                                                res.send(error);
                                                                            }
                                                                            else {
                                                                                const sqlFindClassId = `SELECT id FROM classes  where link=?`;
                                                                                pool.query(sqlFindClassId, [link], (error, resClassId) => {
                                                                                    if (error) {
                                                                                        res.send(error);
                                                                                    }
                                                                                    let sqlInsertNotifi = `INSERT INTO notification (classId,senderId,recipientId,notice,typeNotification) VALUES (?,?,?,?,?)`;
                                                                                    pool.query(sqlInsertNotifi, [resClassId[0].id, user.id, resultAccId[0].accountId, comment, 'finaldecision'], (error, resInsertNotifi) => {
                                                                                        if (error) {
                                                                                            res.send(error);
                                                                                        }
                                                                                        res.json({ message: 'add comment and notification success' });
                                                                                    });
                                                                                });

                                                                            }
                                                                        });

                                                                        // res.json(result6);

                                                                    }
                                                                });

                                                            }
                                                        });
                                                    }
                                                });

                                            }
                                            else {
                                                res.json({ message: "grade decision" });
                                            }
                                        }
                                    });
                                }
                            });

                        }
                    });
                }
                else if (result[0].role === "student") {
                    res.json({ message: "you don't have right mark descision" });
                }
            }
        });
    }
    )(req, res, next);
});

module.exports = router;


 // else {
            //     const sqlIdCmt =`SELECT DISTINCT C.accountId,C.parentid,G.classId,C.comment FROM comment  C INNER JOIN grade G ON C.assignmentId=G.assignmentId WHERE id=LAST_INSERT_ID()`;

            //     pool.query(sqlIdCmt, [user.id], (error, result1) => {
            //         if (error) {
            //             res.send(error);
            //         }
            //         else {
            //             const sqlparentid = `SELECT * from comment WHERE id =?`
            //             pool.query(sqlparentid, [result1[0].parentid], (error, result2) => {
            //                 if (error) {
            //                     res.send(error);
            //                 }
            //                 else {
            //                     const sqlmssv = `SELECT mssv from account WHERE id =?`;
            //                     pool.query(sqlmssv, [result2[0].accountId], (error, result3) => {
            //                         if (error) {
            //                             res.send(error);
            //                         }
            //                         else {

            //                             const insertnotice = `INSERT INTO notification (classId,senderId,recipientId,notice)
            //                             VALUES (?,?,?,?)`
            //                             pool.query(insertnotice, [result1[0].classId,result1[0].accountId,result3[0].mssv,result1[0].comment], (error, result4) => {
            //                                 if (error) {
            //                                     res.send(error);
            //                                 }
            //                                 else {
            //                                     res.json({message:"relpy success"});


            //                                 }
            //                             });

            //                         }
            //                     });


            //                 }
            //             });


            //         }
            //     });
            // }