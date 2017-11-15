var url = "http://localhost:8000/api/";
//Carga de la pagina
$(document).ready(function() {
    $('html').niceScroll();
    $(document).foundation();
    if("Id" in localStorage) {
        $(".menuusertxt").text(localStorage.getItem("Name") + " " + localStorage.getItem("LastName"));
        $(".username").text(localStorage.getItem("Nickname"));

        //Seccion que trae los productos
        var urlGetProduct = url + "purchases/get_p/";
        $.get(urlGetProduct, function (response) {
            for (var i = 0; i < (response.data).length; i++) {
                console.log(response.data[i]);
                $(".container").append('<article>' + '<div class="comprar">' + '<p>Descripción</p>' + '<p>' + (response.data[i]).description + '</p>' + '<div class="confCopmra" hidden >' + '<p> Comprar</p>' + '<p> Precio: $' + (response.data[i]).price + ' MX</p>' + '<p>Disponibles:' + (response.data[i]).stock + ' </p>' + '<p>Cantidad: <input class="prod_cantidad" align="middle" type="numeric" name="cantidad" value="1"></p><p>Total:' + (response.data[i]).price * $(".prod_cantidad").val() + '</p>' + '<p id="boton" onclick="confirmar()">Confirmar</p>' + '</div>' + '</div>' + '<h1>' + (response.data[i]).name + '</h1>' + '</article><style type="text/css">' + '.container article {' + 'background-image: url(' + (response.data[i]).image + ');}' + '</style>');
            }

            $(".rateyo").rateYo({

                rating: 0,
                numStars: 5,
                precision: 0,
                minValue: 1,
                maxValue: 5
            }).on("rateyo.change", function (e, data) {

                $("#calificacion").text(data.rating);
            });

        });
    }else{
        window.location.href = "login.html";
    }
});
function showClientUpdate(event){
    var idClient = event.target.id;
    completeURL = url + "users/view_profile/"
    $.post(completeURL, {user_id: idClient} , function(response) {
        if(response.response == 1){
            $("#upClientName").attr("placeholder", response.user.name);
            $("#upClientLastName").attr("placeholder", response.user.last_name);
            $("#upClientUser").attr("placeholder", response.user.nickname);
            $("#upClientMail").attr("placeholder", response.user.email);
            $("#clientSendUpdate").attr("id", idClient);
            $("#updateClientForm").slideDown('400');

        }else{
            swal(
                'Error!',
                'Algo ocurrio mal.',
                'error'
            )
        }
    });
}
function updateClient(event){
    var urlGetClient = url + "users/get_users_by_type/";
    var idClient = event.target.id;
    completeURL = url + "users/update_user/";
    var clientname = $("#upClientName").val();
    var lastname = $("#upClientLastName").val();
    var clientuser = $("#upClientUser").val();
    var clientmail = $("#upClientMail").val();

    $.post(completeURL, {name: clientname,id: idClient, last_name: lastname, nickname: clientuser, mail: clientmail, password: ""} , function(response) {
        if(response.response == 1){
            swal(
                'Success',
                'Usuario actualizado correctamente',
                'success'
            )
            $("#clientName").val("");
            $("#clientLastName").val("");
            $("#clientUser").val("");
            $("#clientMail").val("");
            $("#clientPassword").val("");
            $("#updateClientForm").hide();
            $(".tbodyClients").html("");
            $.post(urlGetClient, {user_type: 0} , function(response) {
                for(var i=0; i<(response.users).length;i++){
                    console.log(response.users[i]);
                    $(".tbodyClients").append("<tr><td>"+(response.users[i]).name+"</td><td>"+(response.users[i]).nickname+"</td><td>"+(response.users[i]).email+"</td><td><img src='img/edit.png' class='iconoptedit' onclick='showClientUpdate(event)' id='"+(response.users[i]).id+"'><img src='img/delete-button.png' onclick='deleteClient(event)' id='"+(response.users[i]).id+"' class='iconoptdelete deleteClient'></td></tr>");
                }
            });
            $("#TableClients").slideDown('400');
        }else{
            swal(
                'Error',
                'Error Actualizando el Usuario',
                'error'
            )
        }

    }, 'json');

};

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