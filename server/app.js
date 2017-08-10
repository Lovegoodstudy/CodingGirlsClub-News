let express = require('express');
let orm = require('orm');
let app = express();

let bodyParser = require('body-parser');

var jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({extended: true});

let path = require('path');
let appRoot = path.join(__dirname, '/');//cookie的设置
// let session = require("express-session");
// let cookie = require("cookie-parser");
// app.configure(function() {
//     app.use(cookie());
//     app.use(session({
//         name: "final",
//         secret: "1234567",
//         cookie: {maxAge: 10000},   //过期时间 毫秒为单位
//         resave: true,        //每次触发后保存时间
//         rolling: true       // 最后一次触发后计时
//     }));
// });
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(orm.express(`sqlite://${appRoot}database.db`, {
    define: function (db, models, next) {
        models.Manage = db.define("manage", {
            id:Number,
            mangeName:String,
            password : String,
            email:String
        });
        models.News=db.define("news",{
            id : Number,
            title:String,
            content:String,
            date:String
        });
        models.Blogs=db.define("blogs",{
            id : Number,
            title:String,
            content:String,
            date:String
        });
        next();
    }
}));
app.use(express.static('../public'));
app.get('/',urlencodedParser,function (req,res){
    res.sendFile('/home/lovegood/WebstormProjects/CodingGirlsClub-News/public/addArticle.html');
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

var articleRouter = require('./articleRouter');
app.use('/article', articleRouter);

var uploadRouter = require('./uploadRouter');
app.use('/upload', uploadRouter);

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
