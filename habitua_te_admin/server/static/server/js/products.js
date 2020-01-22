var API_URL = "API_BASE_URL";
var ADMIN_API_KEY = "ADMIN_API_KEY";

$(document).ready(function() {
    var url = API_URL + '/products/';
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
        var id = document.getElementById("productID").innerHTML;
        var url = API_URL + '/products/'+id+'/';
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

    $('#addModal').on('show.bs.modal', function () {
        setAddModalCategories();
    });

    $("#addBtn").click(function(){
        var product_name = document.getElementById("p_name").value;
        var proof = document.getElementById("p_proof").value;
        var country = document.getElementById("p_country").value;
        var price = document.getElementById("p_price").value;
        var pic_url = document.getElementById("p_url").value;
        var description = document.getElementById("p_description").value;
        var available = document.getElementById("p_available").value;
        var category = document.getElementById("cat_sel").value;
        var bool;
        
        if(available == 'Sim') {
            bool = 'True';
        } else {
            bool = 'False';
        }

        if(product_name == "" || country == "" || proof == "" || price == "" || url == "" || description == "") {
            alert("Por favor preencha os campos necessários!");
        } else {
            var dataParams = "name="+product_name+"&category_id="+category+"&description="+description+"&proof="+proof+"&country="+country+"&price="+price+"&available="+bool+"&picture="+pic_url;
            var url = API_URL + '/products/';
            
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
            })
        }
    })
})

function clearFields() {
    document.getElementById("p_name").value = "";
    document.getElementById("p_proof").value = "";
    document.getElementById("p_country").value = "";
    document.getElementById("p_price").value = "";
    document.getElementById("p_url").value = "";
    document.getElementById("p_description").value = "";
    document.getElementById("p_available").value = "";
    document.getElementById("cat_sel").value = "";
}

$(function() {
    $('form').submit(function () {
        var id = document.getElementById("id").value;
        var product_name = document.getElementById("product_name").value;
        var proof = document.getElementById("proof").value;
        var country = document.getElementById("country").value;
        var price = document.getElementById("price").value;
        var pic_url = document.getElementById("url").value;
        var description = document.getElementById("description").value;
        var available = document.getElementById("available").value;
        var category = document.getElementById("categories_select").value;
        var bool;
        
        if(available == 'Sim') {
            bool = 'True';
        } else {
            bool = 'False';
        }

        var dataObj = {
            "name": product_name,
            "category_id": category,
            "proof": proof,
            "country": country,
            "price": price,
            "picture": pic_url,
            "description": description,
            "available": bool,
        }

        var url = API_URL + '/products/'+id+'/';
        var dataParams = "name="+product_name+"&category_id="+category+"&description="+description+"&proof="+proof+"&country="+country+"&price="+price+"&available="+bool+"&picture="+pic_url;
        
        $.ajax({
            url: url+'?'+dataParams,
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'json',
            headers: {"X-Api-Key": ADMIN_API_KEY},
            async: false,
            success: function(res) {
                console.log(res);
                window.location.reload();
            },
            error: function(err) {
                console.log(err);
            }
        })
        
        return false
    })
})

window.operateEvents = {
    'click .edit': function (e, value, row, index) {
        $('#editModal').modal('toggle');
        getCategories();
        setModal(row);
    },
    'click .delete': function (e, value, row, index) {
       $('#deleteModal').modal('toggle');
       product = document.getElementById("deleteProduct");
       product.innerHTML = "Tem a certeza que pretende eliminar o produto '" + row.name + "'?";
       id = document.getElementById("productID");
       id.innerHTML = row.id;
    }
}

function getCategories() {
    var url = API_URL + '/categories/';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        headers: {"X-Api-Key": ADMIN_API_KEY},
        async: false,
        success: function(res) {
            var $select = $("#categories_select")
            $select.empty();
            $.each(res,function(key, value) {
                $select.append('<option value=' + value.id + '>' + value.name + '</option>');
            });
            console.log(res);
        }
    });
}

function setAddModalCategories() {
    var url = API_URL + '/categories/';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        headers: {"X-Api-Key": ADMIN_API_KEY},
        async: false,
        success: function(res) {
            var $select = $("#cat_sel")
            $select.empty();
            $.each(res,function(key, value) {
                $select.append('<option value=' + value.id + '>' + value.name + '</option>');
            });
            console.log(res);
        }
    });
}

function setModal(row) {
    var result;

    if(row.available == false) {
        result = 'Não';
    } else {
        result = 'Sim';
    }
    
    var id = document.getElementById("id");
    var product_name = document.getElementById("product_name");
    var proof = document.getElementById("proof");
    var country = document.getElementById("country");
    var price = document.getElementById("price");
    var url = document.getElementById("url");
    var description = document.getElementById("description");
    var available = document.getElementById("available");
    var category = document.getElementById("categories_select");

    id.value = row.id;
    product_name.value = row.name;
    proof.value = row.proof;
    country.value = row.country;
    price.value = row.price;
    url.value = row.picture;
    description.value = row.description;
    available.value = result;
    category.value = row.category_id;
}

function imageFormatter(value, row) {
    return '<img width="100px" height="75px" class="rounded" src="'+value+'" />';
}

function availableFormatter(value, row) {
    if(value == true) {
        return 'Sim';
    }
    else {
        return 'Não';
    }
}

function proofFormatter(value) {
    return value + " %";
}

function priceFormatter(value) {
    return value + " €";
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