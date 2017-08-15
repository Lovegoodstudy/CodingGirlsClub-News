var express=require('express');
var router=express.Router();
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:true});
//判断用户是否登陆。
//第一次请求时我们保存一条用户信息。
router.post('/admin',urlencodedParser,function(req, res) {
    //console.log('success');
    let admin_re=req.body;
    //console.log(admin_re);
    var admin = {
        email:admin_re.email,
        password:admin_re.password,
    };
    req.session.admin = admin;
    res.send({message:'密码已记住'});
});
router.get('/email', urlencodedParser,function(req, res) {
    //console.log(req.session.admin);
    if(req.session.admin){
        var admin=req.session.admin;
        //console.log(admin);
        res.send(admin);
    }
});
router.get('/logout',urlencodedParser,function (req,res) {
    //console.log(req.session.admin);
    req.session.destroy();
    //console.log(req.session.admin);
    res.send('true');
});
module.exports=router;

