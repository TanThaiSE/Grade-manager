var express = require('express');
var router = express.Router();
var pool = require('./pool');
var passport = require('../modules/passport');

/*Câu 2:Class owner uploads a xlsx file with student list F*/
router.post('/api/uploadStudentList', function (req, res, next) {
    let x = req.body.datasend
    try {

        var stack = []
        var count = 0
        var tem = ""
        for (let i = 1; i < x.length - 1; i++) {
            tem += x[i]
            if (x[i] == '}') {
                if (tem[0] == ',') {
                    tem = tem.substring(1)
                }

                stack.push(JSON.parse(tem))
                tem = ""
            }

        }
        for (let i = 0; i < stack.length; i++) {
            //let idpeople =  stack[i].id
            let idpeople = stack[i].StudentId
            let idclass = stack[i].idclass
            let fullName = stack[i].FullName
            let sqlNewAssignment = "INSERT INTO classaccount (idpeople,idclass,role,fullName) values(?,?,?,?)";
            pool.query(sqlNewAssignment, [idpeople, idclass, "sv", fullName], (err, result) => {
                if (err) {
                    res.json({ message: 'Upload sucess' });
                }
            }
            );
        }
        res.json({ message: 'Upload sucess' });
    } catch (error) {
        console.log('LỖI uploadStudentList', x);
    }


});



/*Câu 6:Teacher uploads a xlsx file for grades of all students for a specific assignment F*/
router.post('/api/uploadPoint', function (req, res, next) {
    /**
     * input:[
     * {idassignment:'1',idstudent:100,grade:10}
     * ,{idassignment:'1',idstudent:101,grade:2}]
     * output:inset zô bảng grade
     * 
     */

    let x = req.body.datasend
    try {
        console.log("uploadPoint",x);
        var stack = []
        var count = 0
        var tem = ""
        for (let i = 1; i < x.length - 1; i++) {
            tem += x[i]
            if (x[i] == '}') {
                if (tem[0] == ',') {
                    tem = tem.substring(1)
                }

                stack.push(JSON.parse(tem))
                tem = ""
            }

        }
        /*[{"StudentId":1,"Grade":8,"idassigment":4}] */
        for (let i = 0; i < stack.length; i++) {
            let idass = stack[i].idassigment
            let idstudent = stack[i].StudentId
            let grade = stack[i].Grade
            console.log('csdl nè',idass,idstudent,grade );
            let sqlNewAssignment = "INSERT INTO grade (idassignment,idstudent,grade) values(?,?,?)";

            pool.query(sqlNewAssignment, [idass, idstudent, grade], (err, result) => {
                if (err) {
                    res.json({ message: 'Upload sucess' });
                }
            }
            );
        }
        res.json({ message: 'Upload uploadPoint' });
    } catch (error) {
        console.log("lỗi nè",error);
    }


});

/*câu 5:Input grade for a student at a specific assignment: */
router.post('/api/inputPoint', function (req, res, next) {


});
module.exports = router;