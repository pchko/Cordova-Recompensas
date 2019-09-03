document.addEventListener('deviceready',function(){
    //alert("ready");
    //alert(localStorage.getItem('user'));
    if(localStorage.getItem("user") != null || localStorage.getItem("user") != undefined){
        var user = JSON.parse(localStorage.getItem('user'));
        $("#id_usuario").val(user.idUsuario);
        //alert(user);
        $("#formAcumulacion").validate({
            rules: {
                codigo: "required",
                password: "required",
            },
            messages: {
                codigo: "Campo Obligatorio",
                password: "Campo Obligatorio",
            },        
            submitHandler: function(form, event){     
                event.preventDefault();
                var apiKey = "PXLALA";
                var data = {codigo : $("#codigo").val(), password : md5($("#password").val()), id_usuario : $("#id_usuario").val(), 'key' : apiKey, 'm' : 'acumula'};
                $.ajax({
                    crossDomain:true,
                    type: "POST",
                    timeout: 8000,
                    url: "http://pixanit.com/lala/ws/index.php",
                    data: data,
                    dataType: "json",
                    beforeSend: function(){
                        //alert(data);
                        //window.plugins.spinnerDialog.show("Espere", "Iniciando sesión", true);
                        var options = { dimBackground: true };
                        SpinnerPlugin.activityStart("Registrando Acumulación...", options);
                    }
                }).done(function(data){
                    //window.plugins.spinnerDialog.hide();
                    SpinnerPlugin.activityStop();
                    if(data.result){
                        switch(data.result){
                            case 1:
                                navigator.notification.alert("Felicidades "+user.nombre+", tu acumulación se ha registrado correctamente",  function(){
                                    window.location = "home.html";
                                }, "Éxito", "Aceptar");
                            break;
                            case 2:
                                navigator.notification.alert("Hubo un error al ingresar la acumulación, intenta nuevamente", null, "Error", "Aceptar");
                            break;
                            case 3:
                                navigator.notification.alert("El código ingresado no se encuentra activo, por favor contacta al administrador para más detalles", null, "Error de código", "Aceptar");
                            break;
                            case 4:
                                navigator.notification.alert("El código ingresado no existe, por favor verifica los datos e intenta nuevamente.", null, "Código no válido", "Aceptar");
                            break;
                            case 5:
                                navigator.notification.alert("La contraseña no es correcta, por favor verifica los datos e intenta nuevamente.", null, "Contraseña incorrecta", "Aceptar");
                            break;
                        }
                    }else{
                        navigator.notification.alert("Error al procesar la solicitud, intenta nuevamente, si el problema persiste contacta al administrador.", null, "Éxito", "Aceptar");    
                    }
                    
                }).fail(function(data){
                    //window.plugins.spinnerDialog.hide();
                    SpinnerPlugin.activityStop();
                    navigator.notification.alert(JSON.stringify(data));
                });
            }
        });

    }else{
        localStorage.clear();
        window.location="index.html";
    }

}, false);

