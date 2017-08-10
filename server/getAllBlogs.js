'use strict';
function getAllBlogs(req,res) {
    req.models.Blogs.find(function (err,reply) {
        console.log(reply);
        res.send(JSON.stringify(reply));
    })
}
module.exports={
    getAllBlogs
}