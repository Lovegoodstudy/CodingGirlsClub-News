const BASE_URL = "http://localhost:8081";

function UrlSearch() {
    let name, value;
    let str = location.href; //取得整个地址栏
    let num = str.indexOf("?");
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
    let arr = str.split("&"); //各个参数放到数组里
    for (let i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
        }
    }
}
let request = new UrlSearch();

class articleData {
    constructor() {
        this.title = $('#titleText').val();
        this.author = $('#authorText').val();
        this.content = contentEditor.document.getBody().getHtml();
        this.pictureUrl = localStorage.getItem('CoverImageUrl');
        this.videoUrl = localStorage.getItem('videoUrl');
        this.introduction = contentEditor.document.getBody().getText();
    }
}

if (sessionStorage.user !== "true") {
    location.href = 'login.html';
}

$(document).ready(function () {
    if (request.action === 'revise') {
        $.ajax({
            url : BASE_URL + `/article?type=${request.type}&id=${request.id}`,
            type : 'get',
            success : function (data) {
                $('#titleText').val(data.title);
                $('#authorText').val(data.author);
                contentEditor.setData(data.content);
                localStorage.setItem('CoverImageUrl', data.pictureUrl);
                localStorage.setItem('videoUrl', data.videoUrl);
            }
        });
        if (request.type === 'news') {
            $('#submitBlogs').hide();
            $('#submitNews').bind('click', function () {
                if ($('#titleText').val() === '') {
                    alert('标题不能为空！');
                    return;
                }
                $.ajax({
                    url: BASE_URL + `/article?type=news&id=${request.id}`,
                    type: 'put',
                    dataType: 'json',
                    data: new articleData(),
                    success: function () {
                        alert('文章修改成功！');
                        location.href = `detailWebpage.html?type=news&id=${request.id}`;
                    },
                    error: function () {
                        alert('文章修改失败！');
                    }
                })
            })
        }
        if (request.type === 'blogs') {
            $('#submitNews').hide();
            $('#submitBlogs').bind('click', function () {
                if ($('#titleText').val() === '') {
                    alert('标题不能为空！');
                    return;
                }
                $.ajax({
                    url: BASE_URL + `/article?type=blogs&id=${request.id}`,
                    type: 'put',
                    dataType: 'json',
                    data: new articleData(),
                    success: function () {
                        alert('文章修改成功！');
                        location.href = `detailWebpage.html?type=news&id=${request.id}`;
                    },
                    error: function () {
                        alert('文章修改失败！');
                    }
                })
            })
        }
    } else {
        $('#submitNews').bind('click', function () {
            if ($('#titleText').val() === '') {
                alert('标题不能为空！');
                return;
            }
            $.ajax({
                url: BASE_URL + '/article?type=news',
                type: 'post',
                dataType: 'json',
                data: new articleData(),
                success: function (data) {
                    alert('文章添加成功！');
                    location.href = `detailWebpage.html?type=news&id=${data.id}`;
                },
                error: function () {
                    alert('文章添加失败！');
                }
            });
        });
        $('#submitBlogs').bind('click', function () {
            if ($('#titleText').val() === '') {
                alert('标题不能为空！');
                return;
            }
            $.ajax({
                url: BASE_URL + '/article?type=blogs',
                type: 'post',
                dataType: 'json',
                data: new articleData(),
                success: function (data) {
                    alert('文章添加成功！');
                    location.href = `detailWebpage.html?type=blogs&id=${data.id}`
                },
                error: function () {
                    alert('文章添加失败！');
                }
            });
        })
    }
});