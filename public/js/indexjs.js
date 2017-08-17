/**
 * Created by zh on 17-8-15.
 */
$(document).ready(function () {
    displayLogin();
    let time = new Date();
    let timeYear = time.getFullYear();
    for (let i = timeYear; i >= timeYear - 10; i--) {
        let li = `<option name="year">${i}</option>`;
        $("#btn-year").append(li);
    }
    for (let i = 1; i <= 12; i++) {
        let li = `<option name="month">${i}</option>`;
        $("#btn-month").append(li);
    }

    $("#show_news").css({"background-color": "#ffc400", "border-radius": "5px"});
    let type = "news";
    ajaxBody(type, '', '');
    $("#show_news").click(function () {
        $("#show_news").css({"background-color": "#ffc400", "border-radius": "5px"});
        $("#show_blogs").css({"background-color": "inherit", "border-radius": "5px"});
        $("#thelist").empty();
        type = "news";
        ajaxBody(type, '', '');
    });
    $("#show_blogs").click(function () {
        $("#show_news").css({"background-color": "inherit", "border-radius": "5px"});
        $("#show_blogs").css({"background-color": "#ffc400", "border-radius": "5px"});
        $("#thelist").empty();
        type = "blogs";
        ajaxBody(type, '', '');
    });
    $("#filter").click(function () {
        $("#thelist").empty();
        year = $("#btn-year").val();
        month = $("#btn-month").val();
        if (year === "选择年份") year = '';
        if (month === "选择月份") month = '';
        ajaxBody(type, year, month);
    });

    const BASE_URL = "http://localhost:8081";
    $.ajax({
        url: BASE_URL + `/${type}?count=1&year=&month=`,
        type: "GET",
        crossDomain: true,
        cache: false,
        success: function (data) {
            $("#relativeNews").append(`<h3 style="margin-left: 15px">Top Video</h3>`);
            for (let value of data) {
                if (value.videoUrl !== "") {
                    let html = `
                    <div style="text-align: center;margin-top: 40px">
                    <a href="../detailWebpage.html?type=${type}&id=${value.id}"><p style="margin-bottom: 0">${value.title}</p></a>
                    <video src="${value.videoUrl}" controls style="width: 100%;"></video>
                    </div>`;
                    $("#relativeNews").append(html);
                }

            }
        }
    });
});
function ajaxBody(type, year, month) {
    let count = 1;
    let URL = `http://127.0.0.1:8081/${type}?count=${count}&year=${year}&month=${month}`;
    pageOne(URL, type, "thelist");
    $(window).bind("scroll", function () {
        if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
            $(window).unbind("scroll");
            ajaxRead();
        }
    });
    function ajaxRead() {
        count++;
        URL = `http://127.0.0.1:8081/${type}?count=${count}&year=${year}&month=${month}`;
        $.ajax({
            url: URL,
            type: "GET",
            crossDomain: true,
            cache: false,
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    makeLi(data[i], type, "rectangle1", "thelist", "30%");
                }
                $(window).bind("scroll");
                if (data.length < 6) {
                    makePrompt("thelist");
                }
            }
        });
    }
}

function pageOne(URL, type, theListId) {
    $.ajax({
        url: URL,
        type: "GET",
        crossDomain: true,
        cache: false,
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                makeLi(data[i], type, "rectangle1", "thelist", "30%");
            }
            if (data.length < 6) {
                makePrompt(theListId);
            }
        }
    })
}

function makeLi(data, type, rectangle, theListId, rate) {
    let li = document.createElement('li');
    li.setAttribute("class", rectangle);
    li.style.marginRight = rate;
    if (data.pictureUrl !== null) {
        li.innerHTML = `
        <div class="row html">
        <div class="col-md-8 col-xs-12" style="margin-top: 20px">
        <h3><a href="../detailWebpage.html?type=${type}&id=${data.id}">${data.title}</a></h3>
        <p>作者：${data.author}<span style="margin-left: 10px;margin-right: 10px;border-right: 1px solid gainsboro"></span><span>${data.date}</span></p>
        <p class="content">${data.introduction}</p>
        <a href="../detailWebpage.html?type=${type}&id=${data.id}" style="color: #131010">READ MORE ></a>
        </div>
        <a href="../detailWebpage.html?type=${type}&id=${data.id}" class="col-md-3 img"><img src="${data.pictureUrl}"></a>
        </div>
        `;
    } else {
        li.innerHTML = `
        <div class="row html">
        <div class="col-md-12 col-xs-12">
        <h3><a href="../detailWebpage.html?type=${type}&id=${data.id}">${data.title}</a></h3>
        <p>作者：${data.author}<span class="glyphicon glyphicon-calendar" style="margin-left: 10px"></span><span>${data.date}</span></p>
        <p class="content">${data.introduction}</p>
        <a href="../detailWebpage.html?type=${type}&id=${data.id}" style="color: #131010">READ MORE ></a>
        </div>
        </div>`;
    }
    $(`#${theListId}`).append(li);
}

function makePrompt(theListId) {
    let li = document.createElement('li');
    li.innerHTML = `
        <div class="row html">
            <div class="col-md-10" style="margin-top: 20px">
            <p style="text-align: center;color: #01AAED;font-size: 65%">没有更多新闻了:(</p>
        </div>
                     `;
    $(`#${theListId}`).append(li);
    $(window).unbind('scroll');
}
function displayLogin() {
    if (sessionStorage.user !== "true") {
        var div=document.getElementById('displayLogin');
        var a=document.createElement('a');
        div.appendChild(a);
        a.innerHTML='Login In';
        a.setAttribute('href','login.html');
    } else {
        var div=document.getElementById('displayLogin');
        var a=document.createElement('a');
        div.appendChild(a);
        a.innerHTML='Manage';
        a.setAttribute('href','manageIndex.html');
    }
}





