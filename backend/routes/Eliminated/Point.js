var express = require('express');
var router = express.Router();
var pool = require('./pool');
var passport = require('../modules/passport');

/*Get name assignment based on idLop F*/
router.get('/api/getNameAssignment/:idLop', function (req, res, next) {
    let id = req.params.idLop;
    //let sql='SELECT tenBaiTap FROM managerassignment WHERE idLop=? order by id asc'
    let sql = 'SELECT nameassignment FROM assignment WHERE idclass=? order by id asc'
    pool.query(sql, [id], (error, result) => {
        if (error) {
            res.send({ message: "get fail" });
        }
        else {
            // console.log('GetALLLis: ',result);
            res.json(result);

        }
    });

});

/*Get name student and their point assignments based on idLop */
// router.get('/api/getStudentWithPointAssignment/:idLop', function(req, res, next) {
//     /**
//      * input: idLop
//      * output:[
//      *  {hoten:(trong bảng account),   diemGrade:(trong bảng grade),tenbaitap(tên bài tập)}
//      * ]
//      */
//     let idLop=req.params.idLop;
//     let sql=`SELECT inf.hoten,mpt.diem,mt.tenBaiTap
//     from managerassignment mt
//     inner join managerpointeachassignment mpt on (mt.id=mpt.idAssignment)
//     inner join infomation inf on (mpt.idHocSinh=inf.id)
//     WHERE mt.idLop=${idLop}
//     order by mpt.idHocSinh,mt.id`
//     pool.query(sql,(error,result)=>{
//         if(error){
//             res.send({message:"fail"});
//         }
//         else{
//             let fullname = [];
//             let grade = [];
//             const assignment = [];
//             let fin = [];
//             let n= result.length;
//             for (let i = 0; i<result.length; i++) {
//                 fullname.push(result[i].hoten);
//                 grade.push(result[i].diem)
//                 assignment.push(result[i].tenBaiTap)
//             }
//             let i=0;
//             let left=0;
//             let stack = []
//             while (i < n) {

//                 if (fullname[i] == result[left].hoten) {
//                         stack.push({[assignment[i]]:grade[i]})
//                         i+=1
//                         continue
//                 }
//                 else {
//                         stack.push({fullname:result[left].hoten})
//                         z=(stack.reduce(function(result, current) {
//                             return Object.assign(result, current);
//                         }, {}));
//                         fin.push(z)
//                         left =i;
//                         stack= []
//                     }

//             }
//             stack.push({fullname:result[left].hoten})
//             z=(stack.reduce(function(result, current) {
//                     return Object.assign(result, current);
//                     }, {}));
//             fin.push(z)
//             return res.json(fin)
//         }   
//     });
// });


//F
router.get('/api/getStudentWithPointAssignment/:idLop', function (req, res, next) {
    /* input: idLop
    * output:[
    *  {hoten:(trong bảng account),   diemGrade:(trong bảng grade),tenbaitap(tên bài tập)}
    * ]
    */
    let idLop = req.params.idLop;
    let sql = `SELECT inf.hoten,mpt.grade,mt.nameassignment
    from assignment mt
    inner join grade mpt on (mt.id=mpt.idassignment)
    inner join account inf on (mpt.idstudent=inf.id)
    WHERE mt.idclass=${idLop}
    order by mpt.idstudent,mt.id`
    pool.query(sql, (error, result) => {

        if (error) {
            res.send({ message: "fail" });
        }
        else {
            // res.send(result)
            let fullname = [];
            let grade = [];
            const assignment = [];
            let fin = [];
            let n = result.length;
            for (let i = 0; i < result.length; i++) {
                fullname.push(result[i].hoten);
                grade.push(result[i].grade)
                assignment.push(result[i].nameassignment)
            }
            let i = 0;
            let left = 0;
            let stack = []
            while (i < n) {

                if (fullname[i] == result[left].hoten) {
                    stack.push({ [assignment[i]]: grade[i] })
                    i += 1
                    continue
                }
                else {
                    stack.push({ fullname: result[left].hoten })
                    z = (stack.reduce(function (result, current) {
                        return Object.assign(result, current);
                    }, {}));
                    fin.push(z)
                    left = i;
                    stack = []
                }

            }
            stack.push({ fullname: result[left].hoten })
            z = (stack.reduce(function (result, current) {
                return Object.assign(result, current);
            }, {}));
            fin.push(z)

            for (let i = 0; i < fin.length; i++) {
                let y = fin[i];
                let x = 0;
                for (const property in y) {
                    if (property !== 'fullname') {
                        x += Number(y[property]);
                    }
                    fin[i] = {tongdiem: x ,...y}
                }
            }
            console.log('bangdiemmm',fin);
            return res.json(fin)
        }
    });

    /**
     * [{hoten:'tan",'toan':9},'hamso:',8},
     *  {hoten:'tai",'toan':7},'hamso:',6}
     * ]
     * for()
     */
});

module.exports = router;