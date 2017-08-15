function logout() {
    $.ajax({
        type:'GET',
        url:'http://localhost:8081/session/logout',
        crossDomain:'true',
        success:function (data) {
            if (data){
                location.href='login.html';
            }
        },
        fail:function (data) {

        }
    })
}
