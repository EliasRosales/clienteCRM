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
                console.log(response.data[i]);
                $(".container").append('<article>' + '<div class="comprar">' + '<p>Descripción</p>' + '<p>' + (response.data[i]).description + '</p>' + '<div class="confCopmra" hidden >' + '<p> Comprar</p>' + '<p> Precio: $' + (response.data[i]).price + ' MX</p>' + '<p>Disponibles:' + (response.data[i]).stock + ' </p>' + '<p>Cantidad: <input class="prod_cantidad" align="middle" type="numeric" name="cantidad" value="1"></p><p>Total:' + (response.data[i]).price * $(".prod_cantidad").val() + '</p>' + '<p id="boton" onclick="confirmar()">Confirmar</p>' + '</div>' + '</div>' + '<h1>' + (response.data[i]).name + '</h1>' + '</article><style type="text/css">' + '.container article {' + 'background-image: url(' + (response.data[i]).image + ');}' + '</style>');
            }

            $("section article .comprar p:first-child").on("click", function () {
                $(this).parent().toggleClass("animar");
                $(this).toggleClass("rotateIcon");
                $(this).parent().parent().children("h1").slideToggle("slow");
                $("section article .confCopmra").show();

            });

        });
    }else{
        window.location.href = "login.html";
    }
});

function confirmar(){
    window.location.href="index.html";
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