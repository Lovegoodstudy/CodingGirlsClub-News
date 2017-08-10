'use strict';
$(document).ready(function () {
    $("#newsFilter").click(function () {
        let payload = {
            "startYear": $("#NstartYear").val(),
            "startMonth": $("#NstartMonth").val(),
            "endYear": $("#NendYear").val(),
            "endMonth": $("#NendMonth").val()
        }
    });
    $.ajax({
        url : 'http//localhost:8081/news/filter',
        type : 'POST',
        crossDomain : true,
        cache:false,
        success: function (data) {
            
        },
        error : function (data) {
            
        }
    });
});