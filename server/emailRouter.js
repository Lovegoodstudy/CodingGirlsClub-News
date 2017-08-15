var express = require('express');
var router = express.Router();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: true});
const nodemailer = require('nodemailer');

router.post('/',urlencodedParser,function (req,res) {
    var mail = req.body.email;
    if (mail=="") {
        res.send({'message': "请输入邮箱地址！"});
    }else {
        req.models.Manager.exists({email:mail},function (err,reply) {
            if (err) throw err;
            if (!reply){
                res.send({message:'该邮箱未注册!'});
            }else {
                transporter(mail,res);
            }
        });
    }
});
function transporter(mail,res) {
    var transporter = nodemailer.createTransport({
        service: '163',
        auth: {
            user: 'wjdhok123456@163.com',
            pass: '123456aa'
        }
    });
    var mailOptions = {
        from: 'wjdhok123456@163.com',
        to: mail,
        subject: '重置密码',
        text: '重置密码',
        html: "<h2>重置密码:</h2>" +
        "<a href='http://localhost:8081/reset_password.html'>点我重置密码</a>"
    };
    transporter.sendMail(mailOptions, function (error, info)
    {
        if (!error) {
            res.send({message: "邮件发送成功，请注意查收！"});
        } else {
            console.log(error);
            res.send({message: "邮件发送失败，请稍后重试！"});
        }
    });
}
module.exports=router;
