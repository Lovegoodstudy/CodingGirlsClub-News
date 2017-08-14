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

function reset_password_interface() {
    let email=JSON.parse(document.cookie).email;
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