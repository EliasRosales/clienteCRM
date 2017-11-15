var url = "http://localhost:8000/api/";
//Carga de la pagina
$(document).ready(function() {
    $('html').niceScroll();
    $(document).foundation();
    if("Id" in localStorage) {
        $(".menuusertxt").text(localStorage.getItem("Name") + " " + localStorage.getItem("LastName"));
        $(".username").text(localStorage.getItem("Nickname"));

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
    }else{
        window.location.href = "login.html";
    }
});

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