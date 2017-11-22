var url = "http://localhost:8000/api/";
//Carga de la pagina
$(document).ready(function() {
    $('html').niceScroll();
    $(document).foundation();
    if("Id" in localStorage) {
        $(".menuusertxt").text(localStorage.getItem("Name") + " " + localStorage.getItem("LastName"));
        $(".username").text(localStorage.getItem("Nickname"));

        //Seccion que trae los productos
        var urlGetPurchases = url + "purchases/view_my_purchases/";
        var idClient = localStorage.getItem("Id");
        $.get(urlGetPurchases + idClient + '/', function (response) {
            for (var i = 0; i < (response.my_purchases).length; i++) {
                console.log(response.my_purchases[i]);
                $(".content").append('<tr> <td>'+ response.my_purchases[i].name +'</td><td>'+ response.my_purchases[i].quantity +'</td><td>'+ response.my_purchases[i].unit_price +'</td><td>'+ response.my_purchases[i].total +'</td><td><div class="rateyo"></div><p id="calificacion">'+ response.my_purchases[i].rate +'</p><noscript>Necesitas tener habilitado javascript para poder votar</noscript> </td> </tr>');
            }

            $(".rateyo").rateYo({

                rating: $("#calificacion").val(),
                numStars: 5,
                precision: 0,
                minValue: 0,
                maxValue: 5
            }).on("rateyo.change", function (e, data) {
                var updateRate = url + "purchases/"
                $("#calificacion").text(data.rating);
            });

        });
    }else{
        window.location.href = "login.html";
    }
});

$("#menuT").click(function (event) {
    window.location.href=("index.html");
});

$("#menuMc").click(function (event) {
    window.location.href=("misCompras.html");
});


function ver() {

    if (document.getElementById("menuuser").style.display === "block") {
        document.getElementById("menuuser").style.display = "none"
        document.getElementById("username").style.display= "block"
    } else {
        document.getElementById("menuuser").style.display = "block"
        document.getElementById("username").style.display= "none"
    }
}