$(() => {
    let miFormulario = document.getElementById("formulario");
    miFormulario.addEventListener("submit", validarFormulario);

    function validarFormulario(e) {
        e.preventDefault();
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Formulario Enviado',
            showConfirmButton: false,
            timer: 1500
          })    }

    let mailUsuario = 'test';

    $('#btnEnviar').on('click', () => {
        let error = "";
        $('#incompleto').css("visibility", "hidden");
        $('#mailError').css("visibility", "hidden");
        if ($('#mailContacto').val() === "") {
            $('#incompleto').css("visibility", "visible");
            error = "error";
        }
        else {
            mailUsuario = $('#mailContacto').val()
            let URLGET = {
                "url": "https://api.eva.pingutil.com/email?email=" + mailUsuario,
                "method": "GET",
                "timeout": 0,
            };
            $.ajax(URLGET).done(function (response) {
                console.log(response);
                if (response.data.deliverable === false) {
                    $('#mailError').css("visibility", "visible");
                    error = "mail";
                }
            });
        }
        if (($('#nombreContacto').val() === "" || $('#telefonoContacto').val() === "" ) && error === "") {
            $('#incompleto').css("visibility", "visible");
            error = "error";
        }
    });
});