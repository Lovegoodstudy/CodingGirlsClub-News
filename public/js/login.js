function query_admin_is_existence(data) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8081',
        data:data,
        datatype:'JSON',
        crossDomain: true,
        success: function (data) {

        },
        fail:function (data) {

        }
    })
}
function Login() {
    let admin={};
    let email=$('#email').val();
    let password=$('.password').val();
    //alert(email);
    admin.email=email;
    admin.password=password;
    //console.log(admin);
    //query_admin_is_existence(admin);
}
function weather_set_cookie() {
    let rem=document.getElementsByClassName('remember_me')[0].checked;
    if (rem){
        setCookie();
    }else {
        alert('确定不记住用户名密码吗!')
    }
}
function setCookie() {
    let admin={};
    let email=$('.email').val();
    let password=$('.password').val();
    admin.email=email;
    admin.password=password;
   // alert(JSON.stringify(admin));
    document.cookie=JSON.stringify(admin);
    //alert('邮箱密码成功存到cookie:'+document.cookie);
}
function getCookie() {
    let admin=JSON.parse(document.cookie);
    //alert(admin.email);
    $('.email').val(admin.email);
    $('.password').val(admin.password);
}
window.onload=function(){
    getCookie();
}
function deleteCookie() {
    document.cookie.Expires = new DateTime(1900, 1, 1);
    alert('cookie成功删除!');
}
//deleteCookie();

