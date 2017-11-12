var url = "http://localhost:8000/api/";

//Carga de la pagina
$(document).ready(function() {
    $('html').niceScroll();
    $(document).foundation();
    if ("Id" in localStorage) {
        $(".menuusertxt").text(localStorage.getItem("Name") + " " + localStorage.getItem("LastName"));
        $(".username").text(localStorage.getItem("Nickname"));

        //Seccion que carga infomracion en la tarjeta de usuario
        $("#txtNameInfo").text(localStorage.getItem("Name") + " " + localStorage.getItem("LastName"));
        $("#txtUserInfo").text(localStorage.getItem("Nickname"));
        $("#txtMailInfo").text(localStorage.getItem("Mail"));

        //Seccion que rellena tabla de clientes
        var urlGetProduct = url + "product/get_products/";
        $.post(urlGetProduct, {product: 0}, function (response) {
            for (var i = 0; i < (response.product).length; i++) {
                console.log(response.product[i]);
                $(".container").append('<article>' + '<div class="comprar">' + '<p>Descripción</p>' + '<p>'+(response.users[i]).name+'</p>' + '<div class="confCopmra" hidden >' + '<p> Comprar</p>' + '<p></p>' + '<p>Cantidad: <input type="numeric" name="cantidad"></p>' + '<p>Total:</p>' + '<p id="boton" onclick="confirmar()">Confirmar</p>' + '</div>' + '</div>' + '<h1></h1>' + '</article>');

            }
        });

    } else {
        window.location.href = "login.html";
    }
});

$(function(){
    $("section article .comprar p:first-child").on("click", function(){
        $(this).parent().toggleClass("animar");
        $(this).toggleClass("rotateIcon");
        $(this).parent().parent().children("h1").slideToggle("slow");
        $("section article .confCopmra").show();

    });
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
    }
}