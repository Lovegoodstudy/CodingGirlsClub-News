let express = require('express');
let orm = require('orm');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let urlencodedParser = bodyParser.urlencoded({extended: true});
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
    name: 'database',            //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {max: 180 * 60 * 1000},
    resave: false,
    saveUninitialized: true,
}));

app.use(orm.express(`sqlite:///${appRoot}database.db`, {
    define: function (db, models, next) {
        models.Manager = db.define("manage", {
            id: Number,
            manageName: String,
            password: String,
            email: String
        });
        models.News = db.define("news", {
            id: Number,
            title: String,
            content: String,
            pictureUrl: String,
            videoUrl: String,
            date: String,
            author: String
        });
        models.Blogs = db.define("blogs", {
            id: Number,
            title: String,
            content: String,
            pictureUrl: String,
            videoUrl: String,
            date: String,
            author: String
        });
        next();
    }
}));

app.use(express.static('../public')); //设置静态文件目录，保证css和js的加载

// app.get('/', function (req, res) {
//     res.sendFile('/home/zl/WebstormProjects/CodingGirlsClub-News/public/login.html')
// });
//
// app.get('/addArticle', function (req, res) {
//     res.sendFile('/home/zl/WebstormProjects/CodingGirlsClub-News/public/addArticle.html');
// });

let manageRouter = require('./manageRouter');
app.use('/manage', manageRouter);

let articleRouter = require('./articleRouter');
app.use('/article', articleRouter);

let newsAndBlogsRouter = require('./visitorRouter');
app.use('/', newsAndBlogsRouter);

let uploadRouter = require('./uploadRouter');
app.use('/upload', uploadRouter);
let emailRouter=require('./emailRouter');
app.use('/email',emailRouter);

let server = app.listen(8081, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

