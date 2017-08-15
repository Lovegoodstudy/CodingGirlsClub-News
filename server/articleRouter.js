var express = require('express');
var router = express.Router();
var fs = require('fs');
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.post('/', urlencodedParser, function (req, res) {
    let moment = require('moment');
    console.log(req.body);
    console.log(req.file);
    if (req.query.type === 'news') {
        req.models.News.create({
            videoUrl:req.body.videoUrl,
            pictureUrl: req.body.pictureUrl,
            title: req.body.title,
            author:req.body.author,
            content: req.body.content,
            date: moment().format('YYYY-MM-DD')
        }, function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).send("新闻创建失败");
                return;
            }
            res.send(result);
        });
    }
    if (req.query.type === 'blogs') {
        req.models.Blogs.create({
            videoUrl:req.body.videoUrl,
            pictureUrl: req.body.pictureUrl,
            title: req.body.title,
            author:req.body.author,
            content: req.body.content,
            date: moment().format('YYYY-MM-DD')
        }, function (err, result) {
            if (err) {
                res.status(400).send("博客创建失败");
                return;
            }
            res.send(result);
        })
    }
});

router.get('/', function (req, res) {
    // console.log(req.query.type);
    // console.log(req.query.id);
    if (req.query.type === 'news') {
        req.models.News.get(req.query.id, function (err, result) {
            if (err) {
                return
            }
            res.send(result);
        })
    }
    if (req.query.type === 'blogs'){
        req.models.Blogs.get(req.query.id, function (err, result) {
            if(err) {
                return
            }
            res.send(result);
        })
    }
    //let form = fs.readFileSync('../public/addArticle.html', {encoding: 'utf8'});
    //res.send(form);
});


module.exports = router;