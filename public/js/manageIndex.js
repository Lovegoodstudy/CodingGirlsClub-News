'use strict';
const BASE_URL = "http://localhost:8081";
if (sessionStorage.user !== "true") {
    location.href = 'login.html';
}else {
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
        <input type="checkbox" name="checkBox" lay-skin="primary">
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
<tr id="blogID">
    <td><input type="checkbox" name="" lay-skin="primary"></td>
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
function deleteBlogs(id) {
    console.log(id);
    $.ajax({
        url:BASE_URL+'/manage/blogs'+id,
        type:'delete',
        success:function (data) {
            //$('#seeNews').refresh();
            if(data==="true"){
                layui.use('layer', function () {
                    let layer = layui.layer;
                    layer.confirm('确定删除吗？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        //layer.msg('删除成功', {icon: 1,time:5000});
                        $('#seeBlogs').reload( BASE_URL + '/manage/blogs')
                    })
                });
            }

        }
    })
}
function deleteNews(id) {
    console.log(id);
    $.ajax({
        url:BASE_URL+'/manage/news'+id,
        type:'delete',
        success:function (data) {
            //$('#seeNews').refresh();
            if(data==="true"){
                layui.use('layer', function () {
                    let layer = layui.layer;
                    layer.confirm('确定删除吗？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        //layer.msg('删除成功', {icon: 1,time:5000});
                        location.reload();
                    })
                });
            }

        }
    })
}
$(document).click({

});