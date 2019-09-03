function mis_datos() {
    if (!is_online)
        notify_offline();
    
    // Fill form
    $.jsonp({
        url: services_url + "usr",
        callbackParameter: "callback", 
        timeout: time_out,
        data: {id: user_id()},
        success: function(data) {
            if (data.d != '0')
            {
                $('#nombre').val(data.d.nombre);
                $('#apellidos').val(data.d.apellidos);
                $('#email').val(data.d.email);
                $('#telefono').val(data.d.telefono);
                $('#radio' + data.d.sexo).attr('checked', 'checked');
                var fecha = checkdate(mysql_to_js(data.d.fecha), true);
                $('#dia').val(fecha.day);
                $('#mes').val(fecha.month);
                $('#ano').val(fecha.year);
                $('#nombre_pareja').val(data.d.nombre_pareja);
                if (data.d.foto !== null)
                    $('#foto-perfil').attr('src', assets_url + 'usr/' + data.d.foto);
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
            }
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
                minlength: "La contraseña debe tener al menos 6 caracteres"
            },
            clave1: "Por favor vuelva a escribir su contraseña",
            email: "Por favor escriba su E-mail",
            dia: "Por favor escriba su fecha de nacimiento",
            mes: "Por favor escriba su fecha de nacimiento",
            ano: "Por favor escriba su fecha de nacimiento",            
            sexo: "Por favor seleccione su sexo"
        },
        submitHandler: function(form) {
            show_overlay();
            $.jsonp({
                url: services_url + "e_reg",
                callbackParameter: "callback", timeout: time_out,
                data: {data: $('#reg_data').serialize(), id: user_id()},
                success: function(data) {
                    if (data.d == '1')
                    {
                        function reg_success()
                        {
                            hide_overlay();
                            alerta('Los datos se han guardado con éxito');
                            window.localStorage.setItem("user", $('#email').val());
                        }

                        // Sending image
                        if (imageURI != '')
                        {
                            var options = new FileUploadOptions();
                            options.fileKey = "file";
                            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                            options.mimeType = "image/jpeg";
                            var ft = new FileTransfer();
                            ft.upload(imageURI, services_url + "up_img?id=" + user_id(), win, fail, options);
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
    $(document).on('click', '#camera', function() {
        var destinationType = navigator.camera.DestinationType;
        var quality = (isAndroid) ? (100) : (50);
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: quality, correctOrientation:true, targetWidth: 350, targetHeight: 350, destinationType: destinationType.FILE_URI});
        function onPhotoDataSuccess(url) {
            $('#foto-perfil').attr('src', url);
            imageURI = url;
        }

        function onFail(message) {
            alerta('Ha ocurrido un error al capturar la imagen');
        }
    });
    $(document).on('click', '#libreria', function() {
        var pictureSource = navigator.camera.PictureSourceType;
        var destinationType = navigator.camera.DestinationType;
        var quality = (isAndroid) ? (100) : (50);
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: quality, correctOrientation:true, targetWidth: 350, targetHeight: 350, destinationType: destinationType.FILE_URI, sourceType: pictureSource.PHOTOLIBRARY});
        function onPhotoDataSuccess(url) {
            $('#foto-perfil').attr('src', url);
            imageURI = url;
        }

        function onFail(message) {
            alerta('Ha ocurrido un error al seleccionar la imagen');
        }
    });
    
    // Delete account
    $(document).on('click', '#eliminar_perfil', function(){
        show_right_panel();
        $('#right_panel .panel_in').html('<p>Está a punto de eliminar su perfil en esta aplicación de forma permanente. Esta operación no puede deshacerse.<br /> ¿Está seguro de proceder?</p><br /><br /><a href="javascript:void(0);" class="btn warning yes">Eliminar cuenta</a><a href="javascript:void(0);" class="btn no">Cancelar</a>');
    });
    
    $(document).on('click', '#right_panel .panel_in .yes', function() {
        show_overlay();
        $.jsonp({
            url: services_url + "d_reg",
            callbackParameter: "callback", 
            timeout: time_out,
            data: {id: user_id()},
            success: function(data) {
                if (data.d == '1')
                {
                    // Deleting localstorage
                    window.localStorage.removeItem("user_id");
                    window.localStorage.removeItem("user");      
                    window.localStorage.removeItem("calendario");                    
                    window.localStorage.removeItem("index_calendario");                    
                    window.localStorage.removeItem("medicamentos");                    
                    window.localStorage.removeItem("index_medicamento");  
                    window.plugin.notification.local.cancelAll();                    
                    hide_right_panel();
                    alerta('El perfil ha sido eliminado con éxito', 'index.html');                        
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
    });
    
    $(document).on('click', '#right_panel .panel_in .no', function() {
        hide_right_panel();
    });
}