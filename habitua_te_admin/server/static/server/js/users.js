var API_URL = "API_BASE_URL";
var ADMIN_API_KEY = "ADMIN_API_KEY";

$(document).ready(function() {
    var url = API_URL + '/users/';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        headers: {"X-Api-Key": ADMIN_API_KEY},
        success: function(res) {
            $('table').bootstrapTable({
                data: res
            });
            console.log(res);
        }
    })
})

function imageFormatter(value, row) {
    return '<img width="75px" class="rounded-circle" src="'+value+'" />';
}
