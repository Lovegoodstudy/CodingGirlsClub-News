let express = require('express');
let orm = require('orm');
let app = express();
let bodyPaser = require('body-parser');
let path = require('path');
let urlencodedParser = bodyPaser.urlencoded({extended: true});
let appRoot = path.join(__dirname, '/');


app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.use(orm.express(`sqlite:///${appRoot}/codeGirlsClub.db`, {
    define: function (db, models, next) {
        models.Manager = db.define("manager", {
            id: Number,
            nickname : String,
            password : String,
            email : String
        });
        models.News = db.define('news', {
            id : Number,
            title : String,
            content : String,
            picture : String,
            video : String,
            author: String,
            date: String
        });
        models.Blogs = db.define('blogs', {
            id : Number,
            title : String,
            content : String,
            picture : String,
            video : String,
            author: String,
            date: String

        });
        next();
    }
}));


app.get("/news",function (req, res) {
    let cnt = req.query.count;
    req.models.News.find(function (err, newsInfo) {
        if(err) throw err;
        newsInfo.sort(function(input_a,input_b) {
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
        if(cnt*6>newsInfo.length){
            if(cnt*6-6===newsInfo.length){
                res.status(400).send("没有数据可以返回了");
            }else{
                res.send(newsInfo.slice((cnt-1)*6,newsInfo.length));
            }
        }else{
            res.send(newsInfo.slice((cnt-1)*6,(cnt-1)*6+6));
        }
    });
});

app.listen(8081, function () {
    console.log("App is listening on port 8081!");
});

app.get('/',urlencodedParser,function (req,res){

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

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
