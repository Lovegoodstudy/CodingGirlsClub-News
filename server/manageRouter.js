/**
 * Created by zl on 8/11/17.
 */

let express    = require('express');
let router     = express.Router();

let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: true});

router.post('/', urlencodedParser, function (req, res) {
    let values = req.body;
    let manage = [];
    manage.push(values);
    //console.log(manage);
    req.models.Manager.exists({email: manage[0].email,password: manage[0].password}, function (err, reply) {
        if (err) throw err;
        //console.log(reply);
        if(reply===true){
            //req.session.lastPage = '/database'; //每一次访问时，session对象的lastPage会自动的保存或更新内存中的session中去。
            res.send(reply);
        }else{
            res.json({data:"err!"})
        }
    });
});

router.get('/news', function (req, res) {
    req.models.News.find(function (err,reply) {
        console.log(reply);
        res.send(reply);
    });
});

router.get('/blogs', function (req, res) {
    req.models.Blogs.find(function (err,reply) {
        console.log(reply);
        res.send(reply);
    });
});

module.exports = router;