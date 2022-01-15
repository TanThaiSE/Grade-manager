
const express = require('express');
const router = express.Router();
var pool = require('../Pool');
var axios = require('axios');

const e = require('express');
var jwt = require('jsonwebtoken');
router.post('/api', function (req, res, next) {
    const tokenId= req.body.tokenId;
    async function verify() {
        axios.get(`https://graph.facebook.com/v12.0/me?access_token=${tokenId}&fields=id,name,email`)
            .then( response => {
                const Client = response.data;
                const mail = Client.email;
                const facebookId= Client.id
                const sql = `SELECT id,username,facebookId,email FROM account WHERE email=?`;
                pool.query(sql,[mail],(error,result)=>{
                    if(error){
                        res.send(error);
                    }
                    else{
                    
                        if (result.length > 0) {
                            if (result[0].facebookId === '') {
                                const sqlUpdate = `UPDATE account SET facebookId=? WHERE id=?` ;
                                pool.query(sqlUpdate,[facebookId,result[0].id],(error,result1)=> {
                                    if(error){
                                        res.send(error);
                                    }

                                })
                            }
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
                        
                    }   
                    });


            });

    }
    verify().catch(console.error);

});
module.exports = router;