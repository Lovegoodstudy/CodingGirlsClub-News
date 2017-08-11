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
    // alert(JSON.stringify(admin));
    document.cookie ="path=/";
    document.cookie = `admin=${JSON.stringify(admin)}`;
    //alert('邮箱密码成功存到cookie:'+document.cookie);
}
function getCookie() {
    //alert(document.cookie);
    let arr=document.cookie.split(";");
    let arr1=arr[1].split("=");
    //alert(arr1[1]);
    let admin = JSON.parse(arr1[1]);
    //alert(admin.email);
    $('.email').val(admin.email);
    $('.password').val(admin.password);
}
window.onload = function () {
    getCookie();
}
function deleteCookie() {
    document.cookie.Expires = new DateTime(1900, 1, 1);
    Response.Cookies.Add(document.cookie);
    alert('cookie成功删除!');
}
//deleteCookie();