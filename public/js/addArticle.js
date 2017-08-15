const BASE_URL = "http://localhost:8081";
if (sessionStorage.user !== "true") {
    location.href = 'login.html';
}else{
    $(document).ready(function () {
        $('#submitNews').bind('click', function () {
            if ($('#titleText').val() === '') {
                alert('标题不能为空！');
                return;
            }
            //console.log(contentEditor.document.getBody().getText());
            $.ajax({
                url: BASE_URL + '/article?type=news',
                type: 'post',
                dataType: 'json',
                data: {
                    "title": $('#titleText').val(),
                    "author":$('#authorText').val(),
                    "content": contentEditor.document.getBody().getHtml(),
                    "pictureUrl": JSON.parse(localStorage.getItem('CoverImageUrl')),
                    "videoUrl":JSON.parse(localStorage.getItem('videoUrl')),
                    "introduction":contentEditor.document.getBody().getText()
                },
                success: function () {
                    alert('文章添加成功！');
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
                data: {
                    "title": $('#titleText').val(),
                    "author":$('#authorText').val(),
                    "content": contentEditor.document.getBody().getHtml(),
                    "pictureUrl": JSON.parse(localStorage.getItem('CoverImageUrl')),
                    "videoUrl":JSON.parse(localStorage.getItem('videoUrl')),
                    "introduction":contentEditor.document.getBody().getText()
                },
                success: function () {
                    alert('文章添加成功！');
                },
                error: function () {
                    alert('文章添加失败！');
                }
            });
        })
    });
}