function registro() {
    if (!is_online)
        notify_offline();
    
    
    
    
    // Form validate
    $.validator.addMethod(
            "correct_date",
            function(value, element) {
                var fecha = $('#dia').val() + '/' + $('#mes').val() + '/' + $('#ano').val();
                return checkdate(fecha);
            },
            "La fecha debe tener el formato dd/mm/aaaa."
    );
    $("#reg_data").validate({
        rules: {
            nombre: "required",
            apellidos: "required",
            clave: {
                required: true,
                minlength: 6
            },
            clave1: {
                equalTo: "#clave"
            },
            email: {
                required: true,
                email: true
            },
            sexo: "required",
            dia: { 
                required: true,
                correct_date: true
            },
            mes: { 
                required: true,
                correct_date: true
            },
            ano: { 
                required: true,
                correct_date: true
            },
            acuerdo: "required"
        },
        groups: {
            fecha: "dia mes ano"
        },
        errorPlacement: function(error, element) {
            if (element.attr("name") == "dia" || element.attr("name") == "mes" || element.attr("name") == "ano") 
                error.insertAfter("#date_message");
            else 
                error.insertAfter(element);
        },
        messages: {
            nombre: "Por favor escriba su nombre",
            apellidos: "Por favor escriba sus apellidos",
            clave: {
                required: "Por favor escriba una contraseña",
                minlength: "La contraseña debe tener al menos 6 caracteres"
            },
            clave1: "Por favor vuelva a escribir su contraseña",
            email: "Por favor escriba su E-mail",
            dia: "Por favor escriba su fecha de nacimiento",
            mes: "Por favor escriba su fecha de nacimiento",
            ano: "Por favor escriba su fecha de nacimiento",
            sexo: "Por favor seleccione su sexo",
            acuerdo: "Este campo es obligatorio"
        },
        submitHandler: function(form) {
            show_overlay();
            $.jsonp({
                url: services_url + "reg",
                callbackParameter: "callback", timeout: time_out,
                data: {data: $('#reg_data').serialize()},
                success: function(data) {
                    if (data.d == '1')
                    {
                        function reg_success()
                        {
                            hide_overlay();
                            window.localStorage.setItem("user_id", data.id);
                            window.localStorage.setItem("user", $('#email').val());                            
                            $('#reg_data')[0].reset();
                            $('#foto-perfil').html('');
                            alerta('Gracias por registrarse en Red Crea', 'mis_datos.html');
                        }

                        // Sending image
                        if (imageURI != '')
                        {
                            var options = new FileUploadOptions();
                            options.fileKey = "file";
                            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                            options.mimeType = "image/jpeg";
                            var ft = new FileTransfer();
                            ft.upload(imageURI, services_url + "up_img?id=" + data.id, win, fail, options);
                        }
                        else
                            reg_success();
                        function win(r) {
                            reg_success();
                        }

                        function fail(error) {
                            alerta("Ha ocurrido un error al subir la imagen");
                            reg_success();
                        }

                    }
                    else if (data.d == 'mail')
                    {
                        hide_overlay();
                        alerta('El correo electrónico suministrado ya está registrado. Por favor, seleccione otro');
                    }
                    else
                    {
                        notify_error();
                    }
                },
                error: function(xOptions, textStatus) {
                    notify_offline();
                }
            });
        }
    });
    $(document).on('click', '#camera1', function() {
        var destinationType = navigator.camera.DestinationType;
        var quality = (isAndroid) ? (100) : (50);
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: quality, correctOrientation:true, targetWidth: 350, targetHeight: 350, destinationType: destinationType.FILE_URI});
        function onPhotoDataSuccess(url) {
            $('#foto-perfil1').attr('src', url);
            imageURI = url;
        }

        function onFail(message) {
            alerta('Ha ocurrido un error al capturar la imagen');
        }
    });
    
        $(document).on('click', '#camera2', function() {
        var destinationType = navigator.camera.DestinationType;
        var quality = (isAndroid) ? (100) : (50);
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: quality, correctOrientation:true, targetWidth: 350, targetHeight: 350, destinationType: destinationType.FILE_URI});
        function onPhotoDataSuccess(url) {
            $('#foto-perfil2').attr('src', url);
            imageURI = url;
        }

        function onFail(message) {
            alerta('Ha ocurrido un error al capturar la imagen');
        }
    });
   
}