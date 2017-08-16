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

router.delete('/blogs:id', function (req, res) {
    let array=req.params.id.split(",");
    console.log(array);
    if(array.length===1) {
        req.models.Blogs.find({id: req.params.id}).remove(function (err) {
            if (err)throw err;
            res.send("true");
        });
    }else{
        for(let i=0;i<array.length;i++){
            req.models.Blogs.find({id: array[i]}).remove(function (err) {
                if (err)throw err;
            });
        }
        res.send("true");
    }
});

router.delete('/news:id', function (req, res) {
    //let arrayString=(req.params.id).substring(1,req.params.id.length-1);
    //console.log(arrayString);
    let array=req.params.id.split(",");
    console.log(array);
    if(array.length===1) {
        req.models.News.find({id: req.params.id}).remove(function (err) {
            if (err)throw err;
            res.send("true");
        });
    }else{
        for(let i=0;i<array.length;i++){
            req.models.News.find({id: array[i]}).remove(function (err) {
                if (err)throw err;
            });
        }
        res.send("true");
    }
});

module.exports = router;