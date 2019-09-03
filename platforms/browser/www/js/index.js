//$(document).ready(function(){
    //alert("ready");
    if(window.localStorage.getItem("user") == null || window.localStorage.getItem("user") == undefined){

        $("#formLogin").validate({
            rules: {
                usuario: "required",
                password: "required",
            },
            messages: {
                usuario: "Campo Obligatorio",
                password: "Campo Obligatorio",
            },        
            submitHandler: function(form, event){     
                //event.preventDefault();

                var data = {usuario : $("#usuario").val(), password : md5($("#password").val()), 'key' : apiKey, 'm' : 'login'};
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
                        SpinnerPlugin.activityStart("Iniciando sesión...", options);
                    }
                }).done(function(data){
                    //window.plugins.spinnerDialog.hide();
                    SpinnerPlugin.activityStop();
                    if(data.error){
                        navigator.notification.alert(data.error, null, "Error", "Aceptar");    
                    }else{
                        var user = {};
                        user['nombre'] = data.nombre_usuario;
                        user['apellidos'] = data.apellidos_usuario;
                        user['idUsuario'] = data.id_usuario;
                        user['imagen'] = data.imagen_usuario;
                        user['rol'] = data.rol;
                        user['usuario'] = data.usuario;

                        //alert(user);
                        localStorage.setItem("user", JSON.stringify(user));

                        navigator.notification.alert("Bienvenid@ "+user['nombre'], function(){
                            window.location = "home.html";
                        }, "Sesión Iniciada", "Aceptar");    
                    }
                    
                }).fail(function(data){
                    //window.plugins.spinnerDialog.hide();
                    SpinnerPlugin.activityStop();
                    navigator.notification.alert(JSON.stringify(data));
                });
            }
        });

    }else{
        window.location="home.html";
    }

//});

