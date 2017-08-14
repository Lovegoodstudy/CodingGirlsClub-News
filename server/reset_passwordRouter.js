var express = require('express');
var router = express.Router();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: true});

router.post('/',urlencodedParser,function (req,res) {
    let email=req.body.email;
    let password=req.body.password;
    req.models.Manager.find({email:email},function (err,results) {
        if (err) throw err;
        // //console.log(results);
        // var newRecord = {};
        // //console.log(results[0].id);
        // newRecord.id=results[0].id;
        // newRecord.manageName=results[0].manageName;
        // newRecord.email=results[0].email;
        // newRecord.password = password;
        // req.models.Manager.create(newRecord,function (err,result) {
        //     if (err){
        //         throw err;
        //     }else {
        //         //console.log(result.id);
        //     }
        //})
        results[0].password=password;
        results[0].save(function (err) {
            if (err) {
                console.log(err);
            }
        })
    })
 });
module.exports=router;