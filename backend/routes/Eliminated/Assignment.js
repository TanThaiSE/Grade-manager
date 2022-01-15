var express=require('express');
var router=express.Router();
var pool=require('../pool');
var passport=require('../../modules/passport');
/*Show grade structure FINISH */
router.get('/api/ShowGradeStructure/:link', function(req, res, next) {
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
        let sql=`SELECT Ass.name,Ass.grade FROM classes CL INNER JOIN assignment Ass ON Ass.classId = CL.id WHERE CL.link=?
        ORDER BY ASS.rank ASC
        `;
        pool.query(sql,[link],(error,result)=>{
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

/*Get list assignment */
router.get('/api/GetALLListAssignment/:link', function(req, res, next) {
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
        let sql=`SELECT Ass.name,Ass.grade FROM classes CL INNER JOIN assignment Ass ON Ass.classId = CL.id WHERE CL.link=?
        ORDER BY ASS.rank ASC
        `;
        pool.query(sql,[link],(error,result)=>{
            if(error){
                res.send(error);
            }
            else{
                res.json(result);
                
            }   
        });
    }
    )(req, res, next);
});

/*  Create a assignment FINISH*/
router.post('/api/CreateAssignment', function(req, res, next) {
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
        let {link,name,description,grade} = req.body;
        let sql=`SELECT cl.role,c.id FROM classaccount cl INNER JOIN classes c ON cl.classId=c.id WHERE link=?
        and cl.accountId=?`;
        pool.query(sql,[link,user.id],(error,result)=>{
            if(error){
                res.send(error);
            }
            else{
                if (result[0].role ==="teacher") {
    
                    let sqlInsert = `INSERT INTO assignment (classId,name,creatorId,description,grade) VALUES(?,?,?,?,?)`;
                    pool.query(sqlInsert,[result[0].id,name,user.id,description,grade],(error,result)=> {
                        if(error){
                            res.send(error);
                        }
                        else {
                            res.json({message:'insert assignment success'});
                        }

                    })

                }
                else {
                    res.json({message:'false'});
                }
            
            }   
        });
    }
    )(req, res, next);
})

/*Delete a assignment FINISH*/
router.delete('/api/DeleteAssignment', function(req, res, next) {
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
        let id=req.body.id;
        let sql=`DELETE FROM assignment WHERE id=?`;
        pool.query(sql,[id],(error,result)=>{
            if(error){
                res.send(error);
            }
            else{
                res.json({message:"delete assignment success"});
                
            }   
        });
    }
    
    )(req, res, next);
})

/*Update a assignment FINISH */
router.put('/api/UpdateAssignment', function(req, res, next) {
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
        let { link,id,name,description,grade} = req.body;
        let sql=`SELECT cl.role,c.id FROM classaccount cl INNER JOIN classes c ON cl.classId=c.id WHERE link=?
        and cl.accountId=?`;
        pool.query(sql,[link,user.id],(error,result)=>{
            if(error){
                res.send(error);
            }
            else{
                if (result[0].role ==="teacher") {
    
                    let sqlInsert = `UPDATE assignment SET name=?,description=?,grade=? WHERE id=?`;
                    pool.query(sqlInsert,[name,description,grade,id],(error,result)=> {
                        if(error){
                            res.send(error);
                        }
                        else {
                            res.json({message:'Update assignment success'});
                        }

                    })

                }
                else {
                    res.json({message:'false'});
                }
            
            }   
        });
    }
    )(req, res, next);
})

/*Arrange  assignment NOT FINISH */
router.put('/api/ArrangeAssignment/:link', function(req, res, next) {
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
        let {link,name,description,grade} = req.body;
        let sql=`SELECT cl.role,c.id FROM classaccount cl INNER JOIN classes c ON cl.classId=c.id WHERE link=?
        and cl.accountId=?`;
        pool.query(sql,[link,user.id],(error,result)=>{
            if(error){
                res.send(error);
            }
            else{
                if (result[0].role ==="teacher") {
    
                    let sqlInsert = `INSERT INTO assignment (classId,name,creatorId,description,grade) VALUES(?,?,?,?,?)`;
                    pool.query(sqlInsert,[result[0].id,name,user.id,description,grade],(error,result)=> {
                        if(error){
                            res.send(error);
                        }
                        else {
                            res.json({message:'insert assignment success'});
                        }

                    })

                }
                else {
                    res.json({message:'false'});
                }
            
            }   
        });
    }
    )(req, res, next);
})








// /*Get all list Assignment with check param: idLop F */
// router.get('/api/GetALLListAssignment/:idLop', function(req, res, next) {
//     let idLop=req.params.idLop;
//     //let sql='select * from managerassignment where idLop= ?';
//     let sql='select * from assignment where idclass= ?';
//     pool.query(sql,[idLop],(error,result)=>{
//         if(error){
//             res.send(error);
//         }
//         else{
//             // console.log('GetALLLis: ',result);
//             res.json(result);
            
//         }   
//     });
// });

// /*Create Assignment F*/  
// router.post('/api/AddNewAssignment', function(req, res, next) {
//     //let {tenBaiTap,soDiem,idLop,viTri}=req.body;
//     let {nameassignment,diemBaiTap,idLop,viTri,deadline}=req.body;
//     //let sqlNewAssignment="insert into managerassignment (tenBaiTap,soDiem,idLop,viTri) values(?,?,?,?)";
//     let sqlNewAssignment="insert into assignment (nameassignment,idclass,deadline,diemBaiTap) values(?,?,?,?)";
//     pool.query(sqlNewAssignment,[nameassignment,idLop,deadline,diemBaiTap],(err, result) => {
//          if (err){
//             res.json({message:'add new assignment fail'});
//          }
//          else{
//             //  console.log('kq insert class',result);
//             res.json({message:'add new assignment success'});
//          }
//     }   
//        );

// });

// /*Delete assignment based on id assignment  F*/  
// router.delete('/api/deleteAssignment/:idAssignment', function(req, res, next) {
//     let idAssignment=req.params.idAssignment;
//     let sql='delete from assignment where id=?';
//     pool.query(sql,[idAssignment],(error,result)=>{
//         if(error){
//             res.json({message:'delete  assignment fail'});
//         }
//         else{
//             res.json({message:'delete  assignment success'});
            
//         }   
//     });

// });

// /*Edit assignment based on id assignment F */
// router.put('/api/editAssignment/:idAssignment', function(req, res, next) {
//     let id = req.params.idAssignment;
//    // let {tenBaiTap,soDiem, idLop} = req.body;
//    let {nameassignment,diemBaiTap, idLop} = req.body;
//     console.log('edit edit: ',id);
//     //let sql=`UPDATE managerassignment SET tenBaiTap ='${tenBaiTap}',soDiem ='${soDiem}',idLop='${idLop}' WHERE id='${id}'`
//     let sql=`UPDATE assignment SET nameassignment ='${nameassignment}',diemBaiTap ='${diemBaiTap}',idclass='${idLop}' WHERE id='${id}'`
//     pool.query(sql,(error,result)=>{
//         if(error){
//             res.json({message:'update an assignment fail'});
//         }
//         else{
            
//             res.json({message:"sucess"});
//         }   
//     });

// });

module.exports= router;