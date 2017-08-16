let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.post('/', urlencodedParser, function (req, res) {
    let moment = require('moment');
    if (req.query.type === 'news') {
        req.models.News.create({
            videoUrl:req.body.videoUrl,
            pictureUrl: req.body.pictureUrl,
            title: req.body.title,
            author:req.body.author,
            content: req.body.content,
            introduction:req.body.introduction,
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
            introduction:req.body.introduction,
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

router.put('/', urlencodedParser, function (req, res) {
    let moment = require('moment');
    if (req.query.type === 'news') {
        req.models.News.get(req.query.id, function (err, news) {
            news.videoUrl = req.body.videoUrl;
            news.pictureUrl = req.body.pictureUrl;
            news.title = req.body.title;
            news.author = req.body.author;
            news.content = req.body.content;
            news.introduction = req.body.introduction;
            news.date = moment().format('YYYY-MM-DD');
            news.save(function (err) {
                if (err) {
                    console.log(err);
                    res.status(400).send("新闻更新失败");
                } else {
                    res.send(news);
                }
            })
        });
    }
    if (req.query.type === 'blogs') {
        req.models.News.get(req.query.id, function (err, blogs) {
            blogs.videoUrl = req.body.videoUrl;
            blogs.pictureUrl = req.body.pictureUrl;
            blogs.title = req.body.title;
            blogs.author = req.body.author;
            blogs.content = req.body.content;
            blogs.introduction = req.body.introduction;
            blogs.date = moment().format('YYYY-MM-DD');
            blogs.save(function (err) {
                if (err) {
                    console.log(err);
                    res.status(400).send("博客更新失败");
                } else {
                    res.send(blogs);
                }
            })
        });
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
});


module.exports = router;