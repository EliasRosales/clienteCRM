var url = "http://localhost:8000/api/";
//Carga de la pagina
$(document).ready(function() {
    $('html').niceScroll();
    $(document).foundation();
    if("Id" in localStorage) {
        $(".menuusertxt").text(localStorage.getItem("Name") + " " + localStorage.getItem("LastName"));
        $(".username").text(localStorage.getItem("Nickname"));

        var idClient = localStorage.getItem("Id");
        completeURL = url + "users/view_profile/";
        $.post(completeURL, {user_id: idClient} , function(response) {
            console.log(response);
            if(response.response == 1){
                $("#upClientName").attr("placeholder", response.user.name);
                $("#upClientLastName").attr("placeholder", response.user.last_name);
                $("#upClientUser").attr("placeholder", response.user.nickname);
                $("#upClientMail").attr("placeholder", response.user.email);
                $(".sendform").attr("id", idClient);

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
    var idClient = event.target.id;
    completeURL = url + "users/update_user/";
    var clientname = $("#upClientName").val();
    var lastname = $("#upClientLastName").val();
    var clientuser = $("#upClientUser").val();
    var clientmail = $("#upClientMail").val();
    var clientpassword = $("#upClientPassword").val();

    $.post(completeURL, {name: clientname,id: idClient, last_name: lastname, nickname: clientuser, mail: clientmail, password: clientpassword} , function(response) {
        if(response.response == 1){
            swal(
                'Success',
                'Usuario actualizado correctamente',
                'success'
            )

        }else{
            swal(
                'Error',
                'Error Actualizando el Usuario',
                'error'
            )
        }
        window.location.href = "perfil.html";
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