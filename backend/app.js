var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var passport = require('./modules/passport');
var nodemailer = require('nodemailer');

//init router

var indexRouter = require('./routes/index');
var classRoomRouter = require('./routes/Classroom');
var loginRouter = require('./modules/passport/loginRouter');
var registerRouter = require('./routes/Register');
var sendEmailRouter = require('./routes/SendEmail');
var assignmentRouter = require('./routes/Assignment');
var pointRouter = require('./routes/Point');
var excelRouter = require('./routes/FileExcel');
var importExcelRouter=require('./routes/ImportExcel');
var profileRouter = require('./routes/Profile');
var authorizationRouter=require('./routes/Authorization');
var googleSigninRouter = require('./routes/GoogleSignIn');
var facebookSigninRouter = require('./routes/FacebookSignIn');
var usersRouter = require('./routes/Eliminated/users');
var gradeReviewRouter=require('./routes/GradeReview');
var forgotPasswordRouter=require('./routes/ForgotPassword');
var adminRouter = require('./routes/Admin');
var userRouter =require('./routes/User');
var noticeRouter=require('./routes/Notification');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


//init api from router in here
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/classroom', classRoomRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/sendEmail', sendEmailRouter);
app.use('/assignment', assignmentRouter);
app.use('/point',pointRouter);
app.use('/fileExcel',excelRouter);
app.use('/importExcel',importExcelRouter);
app.use('/profile',profileRouter);
app.use('/idenRole',authorizationRouter);
app.use('/google-sign-in',googleSigninRouter);
app.use('/facebook-sign-in',facebookSigninRouter);
app.use('/gradeReview',gradeReviewRouter);
app.use('/forgotPassword',forgotPasswordRouter);
app.use('/admin',adminRouter);
app.use('/user',userRouter);
app.use('/notification',noticeRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
//https:locahost:5000/assignment//api/GetALLListAssignment/:idNguoiThamGia
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
