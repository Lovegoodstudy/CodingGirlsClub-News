
"use strict";
function memory_to_session(data) {
    debugger;
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8081/session/admin',
        data: data,
        dataType: 'JSON',
        crossDomain: true,
        success: function (data) {
            alert(data.message);
        },
        fail:function () {
            
        }
    })
}
function get_form_session() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8081/session/email',
        crossDomain: true,
        success: function (data) {
            debugger
            var email=data.email;
            var password=data.password;
            $('.email').val(email);
            $('.password').val(password);
        },
        fail:function () {

        }
    })
}
window.onload=function () {
    get_form_session();
}
function weather_set_cookie() {
    let rem = document.getElementsByClassName('remember_me')[0].checked;
    if (rem) {
        setCookie();
    }
}
function setCookie() {
    let admin = {};
    let email = $('.email').val();
    let password = $('.password').val();
    admin.email = email;
    admin.password = password;
    memory_to_session(admin);
}
//module.exports=get_form_session();
