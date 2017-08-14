let express    = require('express');
let router     = express.Router();
let formidable = require('formidable');
let fs         = require('fs');
let path       = require('path');

router.post('/', function (req, res, next) {
    let moment = require('moment');
    let folder = moment().format('YYYYMMDD');
    let dirname = __dirname.replace("/server", '/public/upload/' + folder);
    //console.log(req);
    if (mkdirsSync(dirname, '0777')) {
        let form = new formidable.IncomingForm();
        form.encoding = "utf-8";
        form.uploadDir = dirname;
        form.maxFontSize = 2 * 1024 * 1024;
        form.parse(req, function (err, fields, files) {
            if (err)return;
            //console.log(files);
            let fileName = moment().format() + '-' + files.upload.name;
            //console.log(fileName);
            var newPath = form.uploadDir + "/" + fileName;
            //console.log(newPath);
            fs.rename(files.upload.path, newPath, function () {
                let url = '/upload/' + folder + "/" + fileName;
                res.write(`<script type="text/javascript">window.parent.CKEDITOR.tools.callFunction(${req.query.CKEditorFuncNum}, \'${url}\');</script>`);
                //JSON.stringify({fileName: '/upload/' + folder + "/" + fileName})
                res.end();
            });
        })
    } else
        console.error('error')
});

router.post('/coverImage', function (req, res, next) {
    let moment = require('moment');
    let folder = moment().format('YYYYMMDD');
    let dirname = __dirname.replace("/server", '/public/upload/' + folder);
    //console.log(req);
    if (mkdirsSync(dirname, '0777')) {
        let form = new formidable.IncomingForm();
        form.encoding = "utf-8";
        form.uploadDir = dirname;
        form.maxFontSize = 2 * 1024 * 1024;
        form.parse(req, function (err, fields, files) {
            if (err) return;
            let fileName = moment().format() + '-' + files.file.name;
            var newPath = form.uploadDir + "/" + fileName;

            fs.rename(files.file.path, newPath, function () {
                let url = '/upload/' + folder + "/" + fileName;
                res.send({ url : url });
            });
        })
    }
});

function mkdirsSync(dirpath, mode) {
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split(path.sep).forEach(function (dirname) {
            if (dirname === "") {
                dirname = "/"
            }
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            } else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
        });
    }
    return true;
}
module.exports = router;