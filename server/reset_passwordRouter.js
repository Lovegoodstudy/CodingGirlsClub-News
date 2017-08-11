var express = require('express');
var router = express.Router();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: true});

router.post('/',urlencodedParser,function (req,res) {
    let password=req.body.password;
    // console.log(req.body);
//     req.models.Manager.
 });
module.exports=router;