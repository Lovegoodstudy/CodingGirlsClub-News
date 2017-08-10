const BASE_URL = "http://localhost:8081";

$(document).ready(function () {
    $('#submitNews').bind('click', function () {
        $.ajax({
            url : BASE_URL + '/article?type=news',
            type : 'post',
            dataType : 'json',
            data : {
                "title" : $('#titleText').val(),
                "content" : contentEditor.document.getBody().getHtml()
            },
            success : function () {
                alert('文章添加成功！');
            },
            error : function () {
                alert('文章添加失败！');
            }
        });
    })
    $('#submitBlogs').bind('click', function () {
        $.ajax({
            url : BASE_URL + '/article?type=blogs',
            type : 'post',
            dataType : 'json',
            data : {
                "title" : $('#titleText').val(),
                "content" : contentEditor.document.getBody().getHtml()
            },
            success : function () {
                alert('文章添加成功！');
            },
            error : function () {
                alert('文章添加失败！');
            }
        });
    })
});