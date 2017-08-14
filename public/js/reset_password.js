function reset_password(obj) {
    //alert('success');
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8081/reset_password',
        data:obj,
        dataType:'JSON',
        crossDomain: true,
        success: function (data) {
            if (data.message==true){
                //alert('100');
                location.href='login.html';
            }
        },
        fail:function (data) {

        }
    })
}
function get_email_form_session() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8081/session/email',
        crossDomain: true,
        success: function (data) {
            var email=data.email;
           reset_password_interface(email);
        },
        fail:function () {

        }
    })
}
function reset_password_interface(email) {
    var password={};
    let pwd=$('.password').val();
    let r_pwd=$('.confirm_password').val();
    //alert(pwd);
    if (pwd==""){
        alert('请输入密码!');
    }else {
        if (pwd!=r_pwd){
            alert('密码不一致!');
        }else {
            password.password=pwd;
            password.email=email;
            reset_password(password);
        }
    }
}