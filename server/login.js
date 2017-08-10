'use strict';
let express = require('express');
let orm = require('orm');
let app = express();
let bodyPaser = require('body-parser');
let path = require('path');
let urlencodedParser = bodyPaser.urlencoded({extended: true});
let appRoot = path.join(__dirname, '/');
let session = require("express-session");
let cookie = require("cookie-parser");
function findLogin(req, res) {
    console.log(req);
    let values = req.body;
    console.log(values);
    let manage = [];
    manage.push(values);
    //console.log(manage[0].name);
    req.models.Manage.exists({manageName: manage[0].name, password: manage[0].password}, function (err, reply) {
        if (err) throw err;
        res.send(reply);
    })
}
module.exports = {
    findLogin
}