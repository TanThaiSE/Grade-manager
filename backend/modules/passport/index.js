
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var pool = require('../../routes/Pool');


passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,

    },
    function (req, username, password, done) {
        username = req.body.username;
        password = req.body.password;
        let sqlAccount = `select id,username,isadmin from account where username=? and password =? and emailVerify='' and lockacc=0`;
        pool.query(sqlAccount, [username,password], (error, result) => {
            if (error) {               
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            else {
                if (result.length) {
                    return done(null, result[0]);
                }
                else {
                    return done(null, false, { message: 'Incorrect username or password.' });
                }

            }
        })
    }
));

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.jwt_secret;

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    //return done(null, { id: jwt_payload.id, username: jwt_payload.username });//req.user
    // console.log(jwt_payload)
    return done(null, { id: jwt_payload.id, username: jwt_payload.username,isadmin:jwt_payload.isadmin  });//req.user
}));
module.exports = passport;