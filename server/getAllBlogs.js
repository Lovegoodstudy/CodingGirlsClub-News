'use strict';
function getAllBlogs(req,res) {
    req.models.Blogs.find(function (err,reply) {
        console.log(reply);
        res.send(reply);
    })
}
module.exports={
    getAllBlogs
}