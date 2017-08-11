function confirm_email(obj) {
    //alert('success');
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8081/email',
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
function email_weather_existence() {
    let emails={};
    emails.email=$('.confirm_email').val();
    //alert(JSON.stringify(emails));
    confirm_email(emails);
}