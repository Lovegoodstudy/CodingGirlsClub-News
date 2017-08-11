let express = require('express');
let orm = require('orm');
let app = express();

let path = require('path');
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

app.get('/', function (req, res) {
    res.sendFile('/home/zl/WebstormProjects/CodingGirlsClub-News/public/login.html')
});

app.get('/addArticle', function (req, res) {
    res.sendFile('/home/zl/WebstormProjects/CodingGirlsClub-News/public/addArticle.html');
});

app.get("/news", function (req, res) {
    let cnt = req.query.count;
    req.models.News.find(function (err, newsInfo) {
        if (err) throw err;
        newsInfo.sort(function (input_a, input_b) {
            let a = input_a.date;
            let b = input_b.date;
            let arr_a = a.split('/');
            let arr_b = b.split('/');
            arr_a = arr_a.map(i => parseInt(i));
            arr_b = arr_b.map(i => parseInt(i));
            if (arr_a[0] !== arr_b[0]) {
                return arr_b[0] - arr_a[0];
            } else if (arr_a[1] !== arr_b[1]) {
                return arr_b[1] - arr_a[1];
            } else {
                return arr_b[2] - arr_a[2];
            }
        });
        if (cnt * 6 > newsInfo.length) {
            if (cnt * 6 - 6 === newsInfo.length) {
                res.status(400).send("没有数据可以返回了");
            } else {
                res.send(newsInfo.slice((cnt - 1) * 6, newsInfo.length));
            }
        } else {
            res.send(newsInfo.slice((cnt - 1) * 6, (cnt - 1) * 6 + 6));
        }
    });
});

let manageRouter = require('./manageRouter');
app.use('/manage', manageRouter);

var articleRouter = require('./articleRouter');
app.use('/article', articleRouter);

var uploadRouter = require('./uploadRouter');
app.use('/upload', uploadRouter);

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
