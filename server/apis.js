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

app.use(orm.express(`sqlite:///home/ggbond/Desktop/codeGirlsClub.db`, {
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

app.get("/blogs",function (req, res) {
    let cnt = req.query.count;
    req.models.Blogs.find(function (err, blogsInfo) {
        if(err) throw err;
        blogsInfo.sort(function(input_a,input_b) {
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
        if(cnt*6>blogsInfo.length){
            if(cnt*6-6===blogsInfo.length){
                res.status(400).send("没有数据可以返回了");
            }else{
                res.send(blogsInfo.slice((cnt-1)*6,blogsInfo.length));
            }
        }else{
            res.send(blogsInfo.slice((cnt-1)*6,(cnt-1)*6+6));
        }
    });
});

app.post("/news/filter",urlencodedParser,function (req, res) {
    const THISYEAR = 2017;

    let cnt = req.body.cnt;
    let sy=req.body.NstartYear;
    let sm=req.body.NstartMonth;
    let ey=req.body.NendYear;
    let em=req.body.NendMonth;

    if(ey===''){
        ey = THISYEAR;
    }
    if(em===''){
        em = 12;
    }
    if(sm===''){
        sm = 1;
    }
    if(sy===''){
        sy = -1;
    }

    ey = parseInt(ey);
    em = parseInt(em);
    sy = parseInt(sy);
    sm = parseInt(sm);

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

        //debug:
        // console.log(newsInfo);

        let returnNewsInfo = newsInfo.filter(item => {
            let arr = item.date.split('/');
            arr = arr.map(i => parseInt(i));
            if(compareDate(sy,sm,arr[0],arr[1])<=0 && compareDate(ey,em,arr[0],arr[1])>=0) {
                // console.log("true");
                return true;
            }else {
                // console.log("false");
                return false;
            }
        });

        //debug:
        // console.log(returnNewsInfo);

        if(cnt*6>returnNewsInfo.length){
            if(cnt*6-6===returnNewsInfo.length){
                res.status(400).send("没有数据可以返回了");
            }else{
                res.send(returnNewsInfo.slice((cnt-1)*6,returnNewsInfo.length));
            }
        }else{
            res.send(returnNewsInfo.slice((cnt-1)*6,(cnt-1)*6+6));
        }
    });
});

app.listen(8081, function () {
    console.log("App is listening on port 8081!");
});

function compareDate(y1,m1,y2,m2) {
    if(y1===y2) return m1-m2;
    else return y1-y2;
}