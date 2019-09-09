document.addEventListener('deviceready',function(){

    FCMPlugin.onTokenRefresh(function(token){
        
        navigator.notification.alert("Tu sesión ha caducado, por favor inicia sesión nuevamente", function(){
            localStorage.clear();
            window.location = "index.html";
        }, "Sesión vencida", "Aceptar");
    });

    FCMPlugin.onNotification(function(data){
        if(data.wasTapped){
          //Notification was received on device tray and tapped by the user.
          navigator.notification.alert(data.body,null, data.title, "Aceptar");
          //alert( JSON.stringify(data) );
        }else{
          //Notification was received in foreground. Maybe the user needs to be notified.
          navigator.notification.alert(data.body,null, data.title, "Aceptar");
          //alert( JSON.stringify(data) );
        }
    });

    if(localStorage.getItem("user") != null || localStorage.getItem("user") != undefined){
        var user = JSON.parse(localStorage.getItem('user'));
        $("#id_usuario").val(user.idUsuario);
        $("#spanName").text(user.nombre)
        //alert(user);
        $("#formComentario").validate({
            rules: {
                comentario: "required",
                password: "required",
            },
            messages: {
                comentario: "Campo Obligatorio",
                password: "Campo Obligatorio",
            },        
            submitHandler: function(form, event){     
                event.preventDefault();
                var apiKey = "PXLALA";
                //var data = {comentario : $("#comentario").val(), password : md5($("#password").val()), id_usuario : $("#id_usuario").val(), 'key' : apiKey, 'm' : 'comentarios'};
                var data = {comentario : $("#comentario").val(), id_usuario : $("#id_usuario").val(), 'key' : apiKey, 'm' : 'comentarios'};
                $.ajax({
                    crossDomain:true,
                    type: "POST",
                    timeout: 8000,
                    url: "https://pixanit.com/lala/ws/index.php",
                    data: data,
                    dataType: "json",
                    beforeSend: function(){
                        //alert(data);
                        //window.plugins.spinnerDialog.show("Espere", "Iniciando sesión", true);
                        var options = { dimBackground: true };
                        SpinnerPlugin.activityStart("Registrando Comentario...", options);
                    }
                }).done(function(data){
                    //window.plugins.spinnerDialog.hide();
                    //navigator.notification.alert(JSON.stringify(data));
                    SpinnerPlugin.activityStop();
                    if(data.result){
                        switch(data.result){
                            case 1:
                                navigator.notification.alert("Gracias "+user.nombre+", tu comentario se ha registrado correctamente",  function(){
                                    window.location = "home.html";
                                }, "Éxito", "Aceptar");
                            break;
                            case 2:
                                navigator.notification.alert("Hubo un error al registrar tu comentario, intenta nuevamente", null, "Error", "Aceptar");
                            break;
                            case 3:
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

