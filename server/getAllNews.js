'use strict';
function getAllNews(req,res){
    req.models.News.find(function (err,reply) {
        console.log(reply);
        res.send(JSON.stringify(reply));
    })
}
module.exports={
    getAllNews
}