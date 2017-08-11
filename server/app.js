let express = require('express');
let orm = require('orm');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let urlencodedParser = bodyParser.urlencoded({extended: true});
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

let newsAndBlogsRouter = require('./visitorApis');
app.use('/', newsAndBlogsRouter);

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
