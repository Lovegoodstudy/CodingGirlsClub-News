'use strict';
const BASE_URL = "http://localhost:8081";
function query_admin_is_existence(data) {
    console.log(sessionStorage);
    console.log(data);
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/manage',
        data: data,
        datatype: 'JSON',
        crossDomain: true,
        success: function (data) {
            console.log(data);
            if (data === true) {
                sessionStorage.user = JSON.stringify(data);//状态存入sessionStorage
                console.log(sessionStorage.user);
                //debugger;
                location.href = 'manageIndex.html';
            }
            else {
                layui.use('layer', function () {
                        let layer = layui.layer;
                        layer.msg("登录失败，请核实邮箱和密码！");
                    });
                console.log("登陆失败！");
            }
        }
    })
}
function Login() {
    let admin = {};
    let email = $('.email').val();
    let password = $('.password').val();
    //alert(email);
    admin.email = email;
    admin.password = password;
    console.log(admin);
    query_admin_is_existence(admin);
}


