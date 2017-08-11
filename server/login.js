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
app.use(cookie());
app.use(session({
    secret: '12345',
    name: 'manage',                 //这里的name值得是cookie的name，默认cookie的name是：connect.sid
        cookie:{max:180*60*1000},
    resave: false,
    saveUninitialized: true,
}));
function findLogin(req, res) {
    let values = req.body;
    let manage = [];
    manage.push(values);
    req.models.Manage.exists({email: manage[0].email, password: manage[0].password}, function (err, reply) {
        if (err) throw err;
        console.log(reply);
        if(reply===true){
            //req.session.lastPage = '/manage'; //每一次访问时，session对象的lastPage会自动的保存或更新内存中的session中去。
            res.send(reply);
        }else{
            res.json({data:"err!"})
        }
    })
}
module.exports = {
    findLogin
};