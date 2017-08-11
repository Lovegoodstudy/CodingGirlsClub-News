'use strict';
const BASE_URL = "http://localhost:8081";
$(document).ready(function () {
    $.ajax({
        url: BASE_URL + '/manage/news',
        type: 'get',
        success: function (data) {
            if (sessionStorage.user !== "true") {
                location.href = 'login.html';
            }
            else {
                layui.use(['laypage', 'layer'], function () {
                    let laypage = layui.laypage;
                    let layer = layui.layer;
                    let nums = 3; //每页出现的数据量//模拟渲染
                    let render = function (data, curr) {
                        let arr = [];
                        $('#newsList').empty();
                        let thisData = data.concat().splice(curr * nums - nums, nums);
                        console.log(thisData);
                        //debugger;
                        for (let i = 0; i < thisData.length; i++) {
                            let item1 = `
<tr>
    <th class="common">
    <a href="detail.html?artical=${thisData[i].id}"><span>${thisData[i].title}</span></a>
    <h4 style="width:550px;overflow: hidden;white-space:nowrap;text-overflow:ellipsis;">
    ${thisData[i].content}</h4>
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
                        cont: 'displayNewsList',
                        pages: Math.ceil(data.length / nums),//得到总页数
                        jump: function (obj) {
                            let item = render(data, obj.curr);
                            // console.log(item);
                            $('#newsList').append(item);
                        },
                    })
                })
            }
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
                let nums = 3; //每页出现的数据量//模拟渲染
                let render = function (data, curr) {
                    let arr = [];
                    $('#blogsList').empty();
                    //debugger;
                    let thisData = data.concat().splice(curr * nums - nums, nums);
                    console.log(thisData);
                    for (let i = 0; i < thisData.length; i++) {
                        let item1 = `
<tr>
    <th class="common">
    <a href="detail.html?artical=${thisData[i].id}"><span>${thisData[i].title}</span></a>
    <h4 style="width:550px;overflow: hidden;white-space:nowrap;text-overflow:ellipsis;">
    ${thisData[i].content}</h4>
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
