var express = require('express');
var router = express.Router();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: true});
const nodemailer = require('nodemailer');

// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
// });
router.post('/',urlencodedParser,function (req,res) {
    //console.log(req.body);
    var mail = req.body.email;
    //console.log(mail);
    //检测邮箱地址是否为空
    if (mail=="") {
        //console.log('success');
        res.send({'message': "请输入邮箱地址！"});
    }else {
        //检测邮箱地址是否符合规范
        req.models.Manager.exists({email:mail},function (err,reply) {
            if (err) throw err;
            if (!reply){
                res.send({message:'该邮箱未注册!'});
            }else {
                //邮件发送
                var transporter = nodemailer.createTransport({
                    service: '163',
                    auth: {
                        user: 'wjdhok123456@163.com',//你的163邮箱账号
                        pass: '123456aa'//你的163邮箱密码
                    }
                });
                var mailOptions = {
                    from: 'wjdhok123456@163.com', // sender address
                    to: mail, // list of receivers
                    subject: '重置密码', // Subject line
                    text: '重置密码', // plaintext body
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
        });
    }
})
module.exports=router;
