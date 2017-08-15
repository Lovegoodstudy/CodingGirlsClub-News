
"use strict";
function memory_to_session(data) {
    //debugger;
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
window.onload=function () {
    get_form_cookie();
}
function weather_set_cookie() {
    let rem = document.getElementsByClassName('remember_me')[0].checked;
    if (rem) {
        setCookie();
        //alert('success');
    }
}
function setCookie() {
    let admin = {};
    let email = $('.email').val();
    let password = $('.password').val();
    admin.email = email;
    admin.password = password;
    document.cookie=JSON.stringify(admin);
    memory_to_session(admin);
}
function get_form_cookie() {
    let admin=JSON.parse(document.cookie);
    $('.email').val(admin.email);
    $('.password').val(admin.password);
}
//module.exports=get_form_session();
