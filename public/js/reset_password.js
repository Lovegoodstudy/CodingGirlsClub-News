function reset_password(obj) {
    //alert('success');
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8081/reset_password',
        data:obj,
        dataType:'JSON',
        crossDomain: true,
        success: function (data) {
            alert(data.message);
        },
        fail:function (data) {

        }
    })
}
function reset_password_interface() {
    let arr=document.cookie.split(";");
    let arr1=arr[1].split("=");
    //alert(arr1[1]);
    let admin = JSON.parse(arr1[1]);
    let email=admin.email;
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