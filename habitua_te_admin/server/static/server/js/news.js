var API_URL = "API_BASE_URL";
var ADMIN_API_KEY = "ADMIN_API_KEY";

$(document).ready(function() {
    var url = API_URL + '/events/news/';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        headers: {"X-Api-Key": ADMIN_API_KEY},
        success: function(res) {
            $('table').bootstrapTable({
                data: res
            });
        }
    })

    $("#deleteBtn").click(function(){
        var id = document.getElementById("newsID").innerHTML;
        var url = API_URL + '/events/'+id+'/';
        $.ajax({
            url: url,
            type: 'DELETE',
            dataType: 'json',
            headers: {"X-Api-Key": ADMIN_API_KEY},
            success: function(result) {
                console.log(result);
                window.location.reload();
            },
            error: function(error) {
                console.log(error);
            }
        })
    });

    $("#addBtn").click(function(){
        var title = document.getElementById("e_title").value;
        var description = document.getElementById("e_description").value;
        var event_type = 'news';

        var today = new Date();
        var hours = String(today.getHours()).padStart(2, '0');
        var minutes = String(today.getMinutes()).padStart(2, '0');
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        time = hours + ':' + minutes;

        if(title == "" || description == "") {
            alert("Por favor preencha os campos necessários!");
        } else {
            var dataParams = "title="+title+"&description="+description+"&date="+today+"&time="+String(time)+"&event_type="+event_type;
            var url = API_URL + '/events/';
            
            $.ajax({
                url: url+'?'+dataParams,
                type: 'POST',
                dataType: 'json',
                headers: {"X-Api-Key": ADMIN_API_KEY},
                success: function(result) {
                    clearFields();
                    console.log(result);
                    window.location.reload();
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    })
})

function clearFields() {
    document.getElementById("e_title").value = "";
    document.getElementById("e_description").value = "";
}

$(function() {
    $('form').submit(function () {
        var id = document.getElementById("id").value;
        var title = document.getElementById("title").value;
        var description = document.getElementById("description").value;
        var date = document.getElementById("date").value;
        var time = document.getElementById("time").value;
        var event_type = 'news';

        var url = API_URL + '/events/'+id+'/';
        var dataParams = "title="+title+"&description="+description+"&date="+date+"&time="+time+"&event_type="+event_type;
        
        $.ajax({
            url: url+'?'+dataParams,
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'json',
            headers: {"X-Api-Key": ADMIN_API_KEY},
            async: false,
            success: function(result) {
                console.log(result);
                window.location.reload();
            },
            error: function(error) {
                console.log(error);
            }
        })
        
        return false
    })
})

window.operateEvents = {
    'click .edit': function (e, value, row, index) {
        $('#editModal').modal('toggle');
        setModal(row);
    },
    'click .delete': function (e, value, row, index) {
       $('#deleteModal').modal('toggle');
       product = document.getElementById("deleteNews");
       product.innerHTML = "Tem a certeza que pretende eliminar a notícia '" + row.title + "'?";
       id = document.getElementById("newsID");
       id.innerHTML = row.id;
    }
}

function setModal(row) {
    var id = document.getElementById("id");
    var title = document.getElementById("title");
    var description = document.getElementById("description");
    var date = document.getElementById("date");
    var time = document.getElementById("time");

    id.value = row.id;
    title.value = row.title;
    description.value = row.description;
    date.value = formatDate(row.date);
    time.value = row.time;
}

function formatDate(date) {
    var year = date.split("-")[0];
    var month = date.split("-")[1];
    var day = date.split("-")[2].split(" ")[0];
    return year+"-"+month+"-"+day;
}

function dateFormatter(date) {
    var year = date.split("-")[0];
    var month = date.split("-")[1];
    var day = date.split("-")[2].split(" ")[0];
    return day+"-"+month+"-"+year;
}

function imageFormatter(value, row) {
    return '<img width="100px" height="75px" class="rounded" src="'+value+'" />';
}

function editFormatter(value) {
    return ['<a class="edit" href="javascript:void(0)" title="Editar">',
        '<i class="fa fa-edit"></i>',
        '</a>  '
    ].join('');
}

function deleteFormatter(value) {
    return ['<a class="delete" href="javascript:void(0)" title="Eliminar">',
        '<i class="fa fa-trash text-danger"></i>',
        '</a>  '
    ].join('');
}
