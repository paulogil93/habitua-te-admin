var ONESIGNAL_APP_KEY = "ONE_SIGNAL_APP_KEY";
var ONESIGNAL_API_KEY = "ONE_SIGNAL_API_KEY";

$(function() {
    $('form').submit(function () {
        var title = document.getElementById("title").value;
        var msg = document.getElementById("msg").value;

        var dataObj = {
            "app_id": ONESIGNAL_APP_KEY,
            "included_segments": ["Subscribed Users"],
            "headings": {"en": title},  
            "contents": {"en": msg},
            "data": {}
        }

        var url = 'https://onesignal.com/api/v1/notifications';
                
        $.ajax({
            url: url,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": ONESIGNAL_KEY
            },
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(dataObj),
            success: function(res) {
                var rec = res['recipients'];
                alert("Notificação enviada!\nUtilizadores de destino: " + rec);
                title = "";
                msg = "";
                window.location.reload();
            },
            error: function(err) {
                alert(JSON.stringify(err));
            }
        })
        
        return false
    })
})
