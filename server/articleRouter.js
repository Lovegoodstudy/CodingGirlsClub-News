var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest: '../public/upload/cover'});//上载文件的目标目录。

let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
/*router.post('/picture', upload.single('addPictureUrl'), function (req, res, next) {
    console.log(req.file.path);
    res.send({ret_code: '0'});
    next();
});*/
router.post('/', urlencodedParser,upload.single('addPictureUrl'), function (req, res) {
    let moment = require('moment');
    console.log(req.body);
    console.log(req.file);
    if (req.query.type === 'news') {
        req.models.News.create({title: req.body.title, content: req.body.content, date: moment().format('YYYYMMDD')
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
            title: req.body.title,
            content: req.body.content,
            date: moment().format('YYYYMMDD')
        }, function (err, result) {
            if (err) {
                res.status(400).send("新闻创建失败");
                return;
            }
            res.send(result);
        })
    }
});
router.get('/', function (req, res) {
    let form = fs.readFileSync('../public/addArticle.html', {encoding: 'utf8'});
    res.send(form);
});

module.exports = router;