const express = require('express');
const router = express.Router();
const pool = require('./pool');
const { OAuth2Client } = require('google-auth-library');
const { response } = require('../app');
const e = require('express');
var jwt = require('jsonwebtoken');
const client = new OAuth2Client("398530816289-0muicg4r9jijupqash4l1gkg2p71tbai.apps.googleusercontent.com");
router.post('/api', function (req, res, next) {
     const tokenId = req.body.tokenId;
    async function verify()
    {
        //await console.log("hêheheheheh");
        const ticket =  await client.verifyIdToken({
        idToken: tokenId,
        audience: "398530816289-0muicg4r9jijupqash4l1gkg2p71tbai.apps.googleusercontent.com",
        });
        const payload = ticket.getPayload();
        const googleId = payload.sub;
        const mail = payload.email;
        const sql = `SELECT * FROM account WHERE email=?`;
        pool.query(sql,[mail],(error,result)=>{
        if(error){
            res.send(error);
        }
        else{
        
            if (result.length > 0) {
                if (result[0].googleId === '') {
                    const sqlUpdate = `UPDATE account SET googleId=? WHERE id=?` ;
                    pool.query(sqlUpdate,[googleId,result[0].id],(error,result1)=> {
                        if(error){
                            res.send(error);
                        }
                        else {
                            const finalresult ={
                                success:true,
                                content:result[0],
                                tokenAccess: jwt.sign({
                                    id:result[0].id,
                                    username:result[0].username
                                }, process.env.jwt_secret,
                                { expiresIn:'1h'})
                            };
                            
                            res.json(finalresult);
                        }

                    })
                }
                else {
                    res.json({messeage:"hello"});
                }
            }
            
        }   
        }); 
    }
    // const payload = ticket.getPayload();
    // const mail = payload.email;
    // const googleId = payload.sub;
    // const name = payload.name;
    // const sql = `SELECT * FROM account WHERE email=?`
   
   

    verify().catch(console.error);
    

});
module.exports = router;