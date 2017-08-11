var express = require('express');
var router = express.Router();

let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: true});

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.post('/', urlencodedParser, function (req, res) {
    let moment = require('moment');
    //console.log(req);
    console.log(req.body);
    if (req.query.type === 'news') {
        req.models.News.create({ title : req.body.title, content : req.body.content, date : moment().format('YYYYMMDD')}, function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).send("新闻创建失败");
                return;
            }
            res.send(result);
        });
    }
    if (req.query.type === 'blogs') {
        req.models.Blogs.create({ title : req.body.title, content : req.body.content, date : moment().format('YYYYMMDD')}, function (err, result) {
            if (err) {
                res.status(400).send("新闻创建失败");
                return;
            }
            res.send(result);
        })
    }
});

module.exports = router;