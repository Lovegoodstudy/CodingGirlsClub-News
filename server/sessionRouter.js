var express=require('express');
var router=express.Router();
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:true});
router.post('/admin',urlencodedParser,function(req, res) {
    let admin_re=req.body;
    var admin = {
        email:admin_re.email,
        password:admin_re.password,
    };
    req.session.admin = admin;
});
router.get('/email', urlencodedParser,function(req, res) {
    if(req.session.admin){
        var admin=req.session.admin;
        res.send(admin);
    }
});
router.get('/logout',urlencodedParser,function (req,res) {
    req.session.destroy();
    res.send('true');
});
module.exports=router;

