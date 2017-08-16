function reset_password(obj) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8081/reset_password',
        data:obj,
        dataType:'JSON',
        crossDomain: true,
        success: function (data) {
            if (data.message==true){
                location.href='login.html';
            }
        },
        fail:function (data) {

        }
    })
}
function password_whether_same() {
    document.getElementById('conf_pwd_caution').innerHTML="";
    let pwd=$('.password').val();
    let r_pwd=$('.confirm_password').val();
    if (pwd!=r_pwd){
        document.getElementById('conf_pwd_caution').innerHTML='*前后两次密码不一致';
    }
}
function reset_password_interface() {
    let email=JSON.parse(document.cookie).email;
    var password={};
    let pwd=$('.password').val();
    let r_pwd=$('.confirm_password').val();
    if (pwd==""){
        return;
    }else {
        if (pwd!=r_pwd){
            return;
        }else {
            password.password=pwd;
            password.email=email;
            reset_password(password);
        }
    }
}