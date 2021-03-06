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
                //console.log(response.my_purchases[i]);
                $(".content").append('<tr> <td>'+ response.my_purchases[i].name +'</td><td>'+ response.my_purchases[i].quantity +'</td><td>'+ response.my_purchases[i].unit_price +'</td><td>'+ response.my_purchases[i].total +'</td><td><div id="' + response.my_purchases[i].id + '" class="rateyo_' + i + '"></div><p id="calificacion">'+ response.my_purchases[i].rate +'</p><noscript>Necesitas tener habilitado javascript para poder votar</noscript> </td> </tr>');

                $(".rateyo_" + i).rateYo({
                    rating: response.my_purchases[i].rate,
                    numStars: 5,
                    precision: 0,
                    minValue: 0,
                    maxValue: 5
                }).on("rateyo.set", function (e, data) {
                    var rate = data.rating;
                    var product_id = e.target.id;
                    var user_id = localStorage.getItem("Id");
                    var updateRate = url + "purchases/register_rate/";

                    $.post(updateRate, {user_id: user_id, product_id: product_id, score: rate, comment: ''}, function(data, textStatus, xhr) {
                        if(data.response == 1){
                            swal(
                                'Correcto',
                                'Se registró correctamente la calificación',
                                'success'
                            )
                        }else{
                            swal(
                                'Error',
                                'Vuelva a intentarlo',
                                'error'
                            )
                        }
                    });

                    $("#calificacion").text(data.rating);
                });

            }

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
        document.getElementById("menuuser").style.display = "none";
        document.getElementById("username").style.display= "block";
    } else {
        document.getElementById("menuuser").style.display = "block";
        document.getElementById("username").style.display= "none";
    }
}