var url = "http://localhost:8000/api/";

//Carga de la pagina
$(document).ready(function() {
    $('html').niceScroll();
    $(document).foundation();
    if("Id" in localStorage) {
        $(".menuusertxt").text(localStorage.getItem("Name") + " " + localStorage.getItem("LastName"));
        $(".username").text(localStorage.getItem("Nickname"));

        //Seccion que trae los productos
        var urlGetProduct = url + "products/get_products/";
        $.get(urlGetProduct, function (response) {
            for (var i = 0; i < (response.data).length; i++) {
                // console.log(response.data[i]);
                $(".container").append('<article style="background-image: url(' + response.data[i].image + ')">' + '<div class="comprar">' + '<p>Descripción</p>' + '<p class="descripcion">' + response.data[i].description + '</p>' + '<div class="confCopmra" hidden >' + '<p> Comprar</p>' + '<p id="product_price"> Precio(mx/100): $</p><input id="price" type="number" value="' + (response.data[i]).price + '" disabled>' + '<p id="product_stock">Disponibles: </p> <input id="stock" type="number" value="' + (response.data[i]).stock + '" disabled> ' + '<p id="product_quantity">Cantidad: </p><input onchange="calTotal(event);" id="quantity"  type="number" min="1" max="' + (response.data[i]).stock + '"><p id="product_total"> Total: $ </p><input id="total" type="number"  type="number" disabled>' + '<p class="button" id="'+(response.data[i]).id+'"  onclick="confirmar(event)">Confirmar</p>' + '</div>' + '</div>' + '<h1>' + (response.data[i]).name + '</h1>' + '</article>');
            }
            $("section article .comprar p:first-child").on("click", function () {
                $(this).parent().toggleClass("animar");
                $(this).toggleClass("rotateIcon");
                $(this).parent().parent().children("h1").slideToggle("slow");
                $("section article .confCopmra").show();
            });
            /*$("#quantity").change(function () {
                var cantidad = $(this).val();
                var precio = $("#price").val();
                $("#total").val(cantidad * precio );
                console.log(cantidad * precio);
            });*/




        });
    }else{
        window.location.href = "login.html";
    }
});

function calTotal(event){
    var cantidad = event.path[0].value;
    var precio = event.path[1].children[2].value;
    total = cantidad * precio
    event.path[1].children[8].value = total;
    // console.log(cantidad * precio);
}

function confirmar(event){
    var urlPurchase = url + "purchases/register_purchase/";
    var clientid = localStorage.getItem("Id");
    var productid = event.target.id;
    var quantity = event.path[1].children[6].value;
    var total = event.path[1].children[8].value;

    $.post(urlPurchase, {user_id: clientid, product_id: productid, quantity: quantity, total: total} , function(response) {
        reload_data();
        if(response.response == 1){
            swal(
                'Correcto',
                'Se realizó correctamente la compra',
                'success'
            )
        }else{
            swal(
                'Error',
                'Error intente nuevamente',
                'error'
            )
        }

    }, 'json');

    //window.location.href="index.html";
}

$("#menuT").click(function (event) {
	window.location.href=("index.html");
});

$("#menuMc").click(function (event) {
    window.location.href=("misCompras.html");
});


function ver(){

    if(document.getElementById("menuuser").style.display === "block"){
        document.getElementById("menuuser").style.display="none"
    }else{
        document.getElementById("menuuser").style.display="block"
        document.getElementById("username").style.display= "none"
    }
}

function reload_data(){
    $(".container").html('');
    var urlGetProduct = url + "products/get_products/";
    $.get(urlGetProduct, function (response) {
        for (var i = 0; i < (response.data).length; i++) {
            // console.log(response.data[i]);
            $(".container").append('<article style="background-image: url(' + response.data[i].image + ')">' + '<div class="comprar">' + '<p>Descripción</p>' + '<p>' + response.data[i].description + '</p>' + '<div class="confCopmra" hidden >' + '<p> Comprar</p>' + '<p id="product_price"> Precio(mx/100): $</p><input id="price" type="number" value="' + (response.data[i]).price + '" disabled>' + '<p id="product_stock">Disponibles: </p> <input id="stock" type="number" value="' + (response.data[i]).stock + '" disabled> ' + '<p id="product_quantity">Cantidad: </p><input onchange="calTotal(event);" id="quantity"  type="number" min="1" max="' + (response.data[i]).stock + '"><p id="product_total"> Total: $ </p><input id="total" type="number"  type="number" disabled>' + '<p class="button" id="'+(response.data[i]).id+'"  onclick="confirmar(event)">Confirmar</p>' + '</div>' + '</div>' + '<h1>' + (response.data[i]).name + '</h1>' + '</article>');
        }
        $("section article .comprar p:first-child").on("click", function () {
            $(this).parent().toggleClass("animar");
            $(this).toggleClass("rotateIcon");
            $(this).parent().parent().children("h1").slideToggle("slow");
            $("section article .confCopmra").show();
        });
        /*$("#quantity").change(function () {
            var cantidad = $(this).val();
            var precio = $("#price").val();
            $("#total").val(cantidad * precio );
            console.log(cantidad * precio);
        });*/




    });
}