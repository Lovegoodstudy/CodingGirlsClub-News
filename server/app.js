'use strict';
let express = require('express');
let orm = require('orm');
let app = express();
app.use(express.static('../public'));
let bodyPaser = require('body-parser');
let path = require('path');
let urlencodedParser = bodyPaser.urlencoded({extended: true});
let appRoot = path.join(__dirname, '/');
//cookie的设置
let session = require("express-session");
let cookie = require("cookie-parser");
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// 设置 Cookie
app.use(cookie());
app.use(session({
    secret: '12345',
    name: 'manage',            //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie:{max:180*60*1000},
    resave: false,
    saveUninitialized: true,
}));
app.use(orm.express(`sqlite:///home/zl/sqlites/manage`, {
    define: function (db, models, next) {
        models.Manage = db.define("manage", {
            id:Number,
            mangeName:String,
            password : String,
            email:String
        });
        models.News=db.define("news",{
            title:String,
            content:String,
            picture:String,
            video:String,
            date:String,
            author:String
        });
        models.Blogs=db.define("blogs",{
            title:String,
            content:String,
            picture:String,
            video:String,
            date:String,
            author:String
        });
        next();
    }
}));
app.get('/',urlencodedParser,function (req,res) {
    res.sendFile('/home/zl/WebstormProjects/CodingGirlsClub-News/public/login.html')
});
app.post('/manage',urlencodedParser,function (req,res) {
    let login = require('./login');
    login.findLogin(req,res);
});
app.get('/manage/news',urlencodedParser,function (req,res) {
    let news = require('./getAllNews');
    news.getAllNews(req,res);
});
app.get('/manage/blogs',urlencodedParser,function (req,res) {
    let blogs = require('./getAllBlogs');
    blogs.getAllBlogs(req,res);
});
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});