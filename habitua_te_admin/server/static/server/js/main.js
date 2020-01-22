var $table = $('#userTable');
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
            document.getElementById("userCount").innerHTML = res.length + " Utilizadores";
        }
    })

    var url = API_URL + '/products/';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        headers: {"X-Api-Key": ADMIN_API_KEY},
        success: function(res) {
            document.getElementById("productCount").innerHTML = res.length + " Produtos";
        }
    })

    var url = API_URL + '/events/event/all/';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        headers: {"X-Api-Key": ADMIN_API_KEY},
        success: function(res) {
            document.getElementById("eventCount").innerHTML = res.length + " Eventos";
        }
    })

    var url = API_URL + '/events/news/';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        headers: {"X-Api-Key": ADMIN_API_KEY},
        success: function(res) {
            document.getElementById("newsCount").innerHTML = res.length + " Notícias";
        }
    })

    $("#deleteBtn").click(function(){
        var id = document.getElementById("categoryID").innerHTML;
        var url = API_URL + '/categories/'+id+'/';
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
        var name = document.getElementById("c_name").value;
        var url = document.getElementById("c_url").value;

        if(name == "" || url == "") {
            alert("Por favor preencha os campos necessários!");
        } else {
            var dataParams = "name="+name+"&url="+url;
            var url = API_URL + '/categories/';
            
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
    document.getElementById("c_name").value = "";
    document.getElementById("c_url").value = "";
}

$(function() {
    $('form').submit(function () {
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var url = document.getElementById("url").value;

        var url = API_URL + '/categories/'+id+'/';
        var dataParams = "name="+name+"&url="+url;
        
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
       product = document.getElementById("deleteCategory");
       product.innerHTML = "Tem a certeza que pretende eliminar a categoria '" + row.name + "'?";
       id = document.getElementById("categoryID");
       id.innerHTML = row.id;
    }
}

function setModal(row) {
    var id = document.getElementById("id");
    var name = document.getElementById("name");
    var picture = document.getElementById("url");

    id.value = row.id;
    name.value = row.name;
    picture.value = row.url;
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