var express = require('express');
var router = express.Router();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: true});

router.post('/',urlencodedParser,function (req,res) {
    let email=req.body.email;
    let password=req.body.password;
    req.models.Manager.find({email:email},function (err,results) {
        if (err) throw err;
        results[0].password=password;
        results[0].save(function (err) {
            if (!err) {
                //console.log(err);
                res.send({message:true});
            }
        })
    })
 });
module.exports=router;