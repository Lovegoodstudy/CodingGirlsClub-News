'use strict';
const BASE_URL = "http://localhost:8081";
if (sessionStorage.user !== "true") {
    location.href = 'login.html';
} else {
    //分页news
    $(document).ready(function () {
        $.ajax({
            url: BASE_URL + '/manage/news',
            type: 'get',
            success: function (data) {
                layui.use(['laypage', 'layer'], function () {
                    let laypage = layui.laypage;
                    let layer = layui.layer;
                    let nums = 15; //每页出现的数据量//模拟渲染
                    let render = function (data, curr) {
                        let arr = [];
                        $('#newsList').empty();
                        let thisData = data.concat().splice(curr * nums - nums, nums);
                        console.log(thisData);
                        //debugger;
                        for (let i = 0; i < thisData.length; i++) {
                            let item1 = `
<tr>
    <td>
        <input type="checkbox" class="checkNewsBox" lay-skin="primary" value="${thisData[i].id}">
    </td>
    <th class="common">
    <a href="detailWebpage.html?type=news&id=${thisData[i].id}"><span>${thisData[i].title}</span></a>
    &nbsp;<span type="button" onclick='deleteNews(${thisData[i].id})'class="glyphicon glyphicon-remove-circle" id="deleteNews" aria-hidden="true"></span>
    <h4 style="width:550px;overflow: hidden;white-space:nowrap;text-overflow:ellipsis;">${thisData[i].introduction}</h4>
    </th>
    <td class="by">
    <cite><h3>${thisData[i].author}</h3></cite>
    <em><span>${thisData[i].date}</span></em>
    </td>
</tr>`;
                            arr.push(item1 + `<hr>`);
                        }
                        return arr.join('');
                    };

                    laypage({
                        cont: 'displayNewsList',
                        pages: Math.ceil(data.length / nums),//得到总页数
                        jump: function (obj) {
                            let item = render(data, obj.curr);
                            // console.log(item);
                            $('#newsList').append(item);
                        },
                    })
                })
            },
            error: function () {
            }
        })
    });
    //分页博客
    $(document).ready(function () {
        $.ajax({
            url: BASE_URL + '/manage/blogs',
            type: 'get',
            success: function (data) {
                console.log(data);
                //debugger;
                layui.use(['laypage', 'layer'], function () {
                    let laypage = layui.laypage;
                    let layer = layui.layer;
                    let nums = 15; //每页出现的数据量//模拟渲染
                    let render = function (data, curr) {
                        let arr = [];
                        $('#blogsList').empty();
                        //debugger;
                        let thisData = data.concat().splice(curr * nums - nums, nums);
                        console.log(thisData);
                        for (let i = 0; i < thisData.length; i++) {
                            let item1 = `
<tr>
    <td><input type="checkbox" class="checkBlogsBox" lay-skin="primary" value="${thisData[i].id}"></td>
    <th class="common">
    <a href="detailWebpage.html?type=blogs&id=${thisData[i].id}"><span>${thisData[i].title}</span></a>
    &nbsp;<span type="button" onclick='deleteBlogs(${thisData[i].id})' class="glyphicon glyphicon-remove-circle" id="deleteBlogs" aria-hidden="true"></span>
    <h4 style="width:550px;overflow: hidden;white-space:nowrap;text-overflow:ellipsis;">
    ${thisData[i].introduction}</h4>
    </th>
    <td class="by">
    <cite><h3>${thisData[i].author}</h3></cite>
    <em><span>${thisData[i].date}</span></em></td>
</tr>`;
                            arr.push(item1 + `<hr>`);
                        }
                        return arr.join('');
                    };
                    laypage({
                        cont: 'displayBlogsList',
                        pages: Math.ceil(data.length / nums),//得到总页数
                        jump: function (obj) {
                            let item = render(data, obj.curr);
                            // console.log(item);
                            $('#blogsList').append(item);
                        },
                    })
                })
            },
            error: function () {
            }
        })
    });
}
//删除博客
function deleteBlogs(id) {
    console.log(id);
    $.ajax({
        url: BASE_URL + '/manage/blogs' + id,
        type: 'delete',
        success: function (data) {
            //$('#seeNews').refresh();
            if (data === "true") {
                layui.use('layer', function () {
                    let layer = layui.layer;
                    layer.confirm('确定删除吗？', {
                        btn: ['确定', '取消'] //按钮
                    }, function () {
                        //layer.msg('删除成功', {icon: 1,time:5000});
                        location.reload();
                    })
                });
            }

        }
    })
}
//删除新闻
function deleteNews(id) {
    console.log(id);
    $.ajax({
        url: BASE_URL + '/manage/news' + id,
        type: 'delete',
        success: function (data) {
            //$('#seeNews').refresh();
            if (data === "true") {
                layui.use('layer', function () {
                    let layer = layui.layer;
                    layer.confirm('确定删除吗？', {
                        btn: ['确定', '取消'] //按钮
                    }, function () {
                        //layer.msg('删除成功', {icon: 1,time:5000});
                        location.reload();
                    })
                });
            }

        }
    })
}

//全选删除新闻
function allDeleteNews() {
    let checkNewsBox = document.getElementsByClassName('checkNewsBox');
    console.log(checkNewsBox);
    let id = [];
    for (let i = 0; i < checkNewsBox.length; i++) {
        if (checkNewsBox[i].checked === true) {
            id.push(parseInt(checkNewsBox[i].value));
        }
    }
    console.log(id.toString());
    $.ajax({
        url: BASE_URL + '/manage/news' + id,
        type: 'delete',
        success: function (data) {
            if (data === "true") {
                layui.use('layer', function () {
                    let layer = layui.layer;
                    layer.confirm('确定删除吗？', {
                        btn: ['确定', '取消'] //按钮
                    }, function () {
                        //layer.msg('删除成功', {icon: 1,time:5000});
                        location.reload();
                    })
                });
            }

        }
    });
}
//全选删除博客
function allDeleteBlogs() {
    let checkBlogsBox = document.getElementsByClassName('checkBlogsBox');
    console.log(checkBlogsBox);
    let id = [];
    for (let i = 0; i < checkBlogsBox.length; i++) {
        if (checkBlogsBox[i].checked === true) {
            id.push(parseInt(checkBlogsBox[i].value));
        }
    }
    console.log(id.toString());
    $.ajax({
        url: BASE_URL + '/manage/blogs' + id,
        type: 'delete',
        success: function (data) {
            if (data === "true") {
                layui.use('layer', function () {
                    let layer = layui.layer;
                    layer.confirm('确定删除吗？', {
                        btn: ['确定', '取消'] //按钮
                    }, function () {
                        //layer.msg('删除成功', {icon: 1,time:5000});
                        location.reload();
                    })
                });
            }

        }
    });
}
