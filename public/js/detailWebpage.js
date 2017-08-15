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

function loadInfo() {
    let articalId=GetQueryString("artical_id");
    if(newsId !=null && news.id.toString().length>1)
    {
        getDetailDataFromSQ(newsId);
    }
}


function getDetailDataFromSQ(data) {
    $.get(
        BASE_URL + '/article?type=news',

        function (data) {
            loadDataOnHtml(data);
        }
    );
}


function loadDataOnHtml(data) {

    $("#mainPicture").append(`${data.pictureUrl}`);

    $("#title").html(data.title);
    $("#author").html(data.author);


    $("#content").append(`<p> ${data.content}</p>`);

}

