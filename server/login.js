'use strict';
let express = require('express');
let orm = require('orm');
let app = express();
let bodyPaser = require('body-parser');
let path = require('path');
let urlencodedParser = bodyPaser.urlencoded({extended: true});
let appRoot = path.join(__dirname, '/');
let session = require("express-session");
let cookie = require("cookie-parser");
function findLogin(req, res) {
    let values = req.body;
    console.log(values);
    let manage = [];
    manage.push(values);
    //console.log(manage[0].name);
    req.models.Manage.exists({manageName: manage[0].name, password: manage[0].password}, function (err, reply) {
        if (err) throw err;
        if ($("#remPwd").is(":checked")) {
            res.cookie("manage", {"user": manage[0].name, "pwd": manage[0].password}, {maxAge: 1000 * 60 * 60});
            //登陆成功后将用户和密码写入Cookie，maxAge为cookie过期时间
            req.session.user=manage[0].name;//服务器端session保存登陆的会话状态
           // res.render("perCenter",{u_tel:req.session.user});//ejs模板引擎渲染用户中心页面
        }
        res.send(reply);
    })
}
module.exports = {
    findLogin
}