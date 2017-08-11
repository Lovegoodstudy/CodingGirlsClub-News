/**
 * Created by zh on 17-8-8.
 */

$(document).ready(function () {
    let count = 1;
    $.ajax({
        url: "http://127.0.0.1:8081/blogs?count=1",
        type: "GET",
        crossDomain: true,
        cache: false,
        beforeSend: function () {
            console.log('loading...')
        },
        success: function (data) {
            console.log(data)

            let el, li, i,div1,div2;
            el = document.getElementById('thelist1');
            div1 = document.createElement('div');
            div2 = document.createElement('div');
            div1.appendChild(div2);
            el.appendChild(div1);
            div1.setAttribute("class","time-line-content");
            div1.style.height = `${data.length*188}px`;
            div2.setAttribute("class","time-line");
            div2.style.height = `${data.length*191}px`;

            for (i = 0; i < data.length; i++) {
                if(i%2===1){
                    if (data[i].videoUrl === null) {

                        li = document.createElement('li');
                        li.setAttribute("class","rectangle2");
                        li.style.marginLeft = '30%';
                        li.innerHTML = `
<div class="row html">
<div class="col-md-8 col-xs-12">
<h3><a href="">${data[i].title}</a></h3>
<p>作者：${data[i].author}<span class="glyphicon glyphicon-calendar" style="margin-left: 10px"></span><span>${data[i].date}</span></p>
<p class="content">${data[i].content}</p>
<a href="">READ MORE</a>
</div>
<a href="" class="col-md-4 img"><img src="./image/news.jpg"></a>
</div>

`;
                        /*<div class="html">
                         <h3><a href="">${data[i].title}</a></h3>
                         <p>作者：${data[i].author}<span class="glyphicon glyphicon-calendar" style="margin-left: 10px"></span><span>${data[i].date}</span></p>
                         <p class="content">${data[i].content}</p>
                         <a href="">READ MORE</a>
                         </div>*/
                        el.appendChild(li, el.childNodes[0]);

                    } else {

                    }
                }else {
                    if (data[i].videoUrl === null) {
                        li = document.createElement('li');
                        li.setAttribute("class","rectangle2");
                        li.style.marginLeft = '15%';
                        li.innerHTML = `
<div class="row html">
<div class="col-md-8 col-xs-12">
<h3><a href="">${data[i].title}</a></h3>
<p>作者：${data[i].author}<span class="glyphicon glyphicon-calendar" style="margin-left: 10px"></span><span>${data[i].date}</span></p>
<p class="content">${data[i].content}</p>
<a href="">READ MORE</a>
</div>
<a href="" class="col-md-4 img"><img src="./image/news.jpg"></a>
</div>
`;

                        el.appendChild(li, el.childNodes[0]);
                    } else {

                    }
                }
            }
            if(data.length<6){
                el = document.getElementById('thelist1');
                li = document.createElement('li');
                el.appendChild(li, el.childNodes[0]);
                li.innerHTML = `
                     <div class="row html">
<div class="col-md-10" style="margin-top: 20px">
<p style="text-align: center;color: #01AAED;font-size: 65%">没有更多新闻了:(</p>
</div>
                     `;
                $(window).unbind('scroll');
            }
        }
    });

    let t;
    let flag = 0;
    $(window).bind('scroll',function(){

        console.log("flag:"+flag);
        if(flag>0){
            clearTimeout(t);
        }
        t = setTimeout(show(),500);
        flag = 1;
    });
    function show(){
        if($(window).scrollTop()+$(window).height()>=$(document).height()){
            ajaxRead();
        }
    }

    // let t;
    // function show(){
    //
    //     if(flag){
    //         if($(window).scrollTop()+$(window).height()>=$(document).height()){
    //             // t = setTimeout("ajaxRead()",100);
    //             // show()
    //             ajaxRead();
    //             flag=0;
    //         }
    //     }
    //
    // }

    function ajaxRead() {
        count++;
        console.log(count)
        $.ajax({
            url:`http://127.0.0.1:8081/blogs?count=${count}`,
            type:"GET",
            crossDomain:true,
            cache:false,
            beforeSend:function(){console.log('loading...')},
            success:function(data){
                let el, li, i,div1,div2,div3;
                el = document.getElementById('thelist1');
                div3 = document.createElement('div');
                div3.setAttribute("class","time-line1");
                el.appendChild(div3);

                if(count % 2 ===0){
                    div1 = document.createElement('div');
                    div2 = document.createElement('div');
                    div1.appendChild(div2);
                    el.appendChild(div1);
                    div1.setAttribute("class","time-line-content2");
                    div1.style.height = `${data.length*188}px`;
                    div2.setAttribute("class","time-line2");
                    div2.style.height = `${data.length*196}px`;
                    for (i = 0; i < data.length; i++) {
                        if(i%2 === 1){
                            if (data[i].videoUrl === null) {
                                li = document.createElement('li');
                                li.setAttribute("class","rectangle1");
                                li.style.marginRight = '30%';
                                li.innerHTML = `
<div class="row html">
<div class="col-md-8 col-xs-12">
<h3><a href="">${data[i].title}</a></h3>
<p>作者：${data[i].author}<span class="glyphicon glyphicon-calendar" style="margin-left: 10px"></span><span>${data[i].date}</span></p>
<p class="content">${data[i].content}</p>
<a href="">READ MORE</a>
</div>
<a href="" class="col-md-4 img"><img src="./image/news.jpg"></a>
</div>
`;
                                el.appendChild(li, el.childNodes[0]);

                            } else {

                            }
                        }else {
                            if (data[i].videoUrl === null) {
                                li = document.createElement('li');
                                li.setAttribute("class","rectangle1");
                                li.style.marginRight = '15%';
                                li.innerHTML = `
<div class="row html">
<div class="col-md-8 col-xs-12">
<h3><a href="">${data[i].title}</a></h3>
<p>作者：${data[i].author}<span class="glyphicon glyphicon-calendar" style="margin-left: 10px"></span><span>${data[i].date}</span></p>
<p class="content">${data[i].content}</p>
<a href="">READ MORE</a>
</div>
<a href="" class="col-md-4 img"><img src="./image/news.jpg"></a>
</div>
`;
                                el.appendChild(li, el.childNodes[0]);
                            } else {

                            }
                        }
                    }
                }else {
                    div1 = document.createElement('div');
                    div2 = document.createElement('div');
                    div1.appendChild(div2);
                    el.appendChild(div1);
                    div1.setAttribute("class","time-line-content");
                    div1.style.height = `${data.length*188}px`;
                    div2.setAttribute("class","time-line");
                    div2.style.height = `${data.length*177}px`;
                    for (i = 0; i < data.length; i++) {
                        if(i%2===1){
                            if (data[i].videoUrl === null) {
                                li = document.createElement('li');
                                li.setAttribute("class","rectangle2");
                                li.style.marginLeft = '30%';
                                li.innerHTML = `
<div class="row html">
<div class="col-md-8 col-xs-12">
<h3><a href="">${data[i].title}</a></h3>
<p>作者：${data[i].author}<span class="glyphicon glyphicon-calendar" style="margin-left: 10px"></span><span>${data[i].date}</span></p>
<p class="content">${data[i].content}</p>
<a href="">READ MORE</a>
</div>
<a href="" class="col-md-4 img"><img src="./image/news.jpg"></a>
</div>
`;
                                el.appendChild(li, el.childNodes[0]);

                            } else {

                            }
                        }else {
                            if (data[i].videoUrl === null) {
                                li = document.createElement('li');
                                li.setAttribute("class","rectangle2");
                                li.style.marginLeft = '15%';
                                li.innerHTML = `
<div class="row html">
<div class="col-md-8 col-xs-12">
<h3><a href="">${data[i].title}</a></h3>
<p>作者：${data[i].author}<span class="glyphicon glyphicon-calendar" style="margin-left: 10px"></span><span>${data[i].date}</span></p>
<p class="content">${data[i].content}</p>
<a href="">READ MORE</a>
</div>
<a href="" class="col-md-4 img"><img src="./image/news.jpg"></a>
</div>
`;
                                el.appendChild(li, el.childNodes[0]);
                            } else {

                            }
                        }
                    }
                }
                if(data.length<6){
                    el = document.getElementById('thelist1');
                    li = document.createElement('li');
                    li.setAttribute("class","rectangle3");
                    el.appendChild(li, el.childNodes[0]);
                    li.innerHTML = `
                     <div class="row html">
<div class="col-md-10" style="margin-top: 20px">
<p style="text-align: center;color: #01AAED;font-size: 65%">没有更多新闻了:(</p>
</div>
                     `;
                    $(window).unbind('scroll');
                }
                flag = 0;
            },
            complete:function(){console.log('mission acomplete.')},
        });
    }
});

