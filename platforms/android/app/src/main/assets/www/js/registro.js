document.addEventListener('deviceready', function(){

    FCMPlugin.getToken(function(token){
        //alert(token);
        localStorage.setItem('token', token);
        $("#token").val(token);
    });

    $.ajax({
        crossDomain:true,
        type: "POST",
        timeout: 8000,
        url: "https://pixanit.com/lala/ws/index.php",
        data: {m:"getConfigRegistro", key : apiKey},
        dataType: "json",
        beforeSend: function(){
            //alert(data);
            //window.plugins.spinnerDialog.show("Espere", "Iniciando sesión", true);
            var options = { dimBackground: true };
            SpinnerPlugin.activityStart("Espere por favor...", options);
        }
    }).done(function(data){
        //window.plugins.spinnerDialog.hide();
        SpinnerPlugin.activityStop();
        //alert(JSON.stringify(data));
        if(data && data.zonas){
            $.each(data.zonas, function(index, element){
                var option = $("<option>", {value : element.idZona, text : element.nombre});
                $("#id_zona").append(option);
            });
        }

        if(data && data.puestos){
            $.each(data.puestos, function(index, element){
                var option = $("<option>", {value : element.idPuesto, text : element.nombre});
                $("#id_puesto").append(option);
            });
        }
        
    }).fail(function(data){
        //window.plugins.spinnerDialog.hide();
        SpinnerPlugin.activityStop();
        alert(JSON.stringify(data));
    });

    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var year = String(today.getFullYear()-18);

    $("#fechaNacimiento").attr("max",year+"-"+month+"-"+day);

    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );

    $.validator.addMethod(
        "confirmPassword",
        function(value, element, regexp) {
            return $("#password").val() == $("#repassword").val();
        },
        "Las contraseñas no coinciden"
    );

    $("#formRegistro").validate({
        rules: {
            nombre: {"required" : true, regex : "[A-za-z]{2,}"},
            apPaterno: {"required" : true, regex : "[A-za-z]{4,}"},
            apMaterno: {"required" : true, regex : "[A-za-z]{4,}"},
            mail: {"required" : true, regex : /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/ },
            fechaNacimiento: {"required" : true},
            username: {"required" : true, regex : "[A-za-z0-9]{6,15}"},
            password: {"required" : true, regex : /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ },
            repassword: {"required" : true, regex : /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, confirmPassword : true },
            terminos : {"required" : true},
            id_zona : {"required" : true},
            id_puesto : {"required" : true}
        },
        messages: {
            nombre: {"required" : "Debes ingresar un nombre", regex : "Ingresa un nombre valido"},
            apPaterno: {"required" : "Ingresa tu Apellido Paterno", regex : "Ingresa un apellido valido"},
            apMaterno: {"required" : "Ingresa tu Apellido Materno", regex : "Ingresa un apellido valido"},
            mail: {"required" : "Ingresa un correo electrónico", regex : "Ingresa un email valido"},
            fechaNacimiento: {"required" : "Ingresa tu fecha de nacimiento"},
            username: {"required" : "Ingresa un usuario", regex : "Username no válido, mínimo 6 caracteres y puede contener unicamente letras y numeros"},
            password: {"required" : "Ingresa una contraseña", regex : "La contraseña debe ser de al menos 8 caracteres, llevar una mayuscula, minuscula y un numero"},
            repassword: {"required" : "Confirma tu contraseña", regex : "La contraseña debe ser de al menos 8 caracteres, llevar una mayuscula, minuscula y un numero"},
            terminos : {"required" : "Debes aceptar los términos y condiciones"},
            id_zona : {"required" : "Debes elegir una zona"},
            id_puesto : {"required" : "Debes elegir un puesto"}
        },
        submitHandler: function(form, event){     
            event.preventDefault();
            var data = {nombre : $("#nombre").val(), ap_pat: $("#apPaterno").val(), ap_mat: $("#apMaterno").val(), mail : $("#mail").val(), fechaNacimiento : $("#fechaNacimiento").val(), usuario : $("#username").val(), password : md5($("#password").val()), 'key' : apiKey, 'm' : 'registro', id_zona : $("#id_zona").val(), id_puesto : $("#id_puesto").val(), token : $("#token").val()};
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
                    SpinnerPlugin.activityStart("Espere por favor...", options);
                }
            }).done(function(data){
                //window.plugins.spinnerDialog.hide();
                SpinnerPlugin.activityStop();
                if(data.result && data.result == 1){
                    var user = [];
                    user['nombre'] = data.usuario.nombre_usuario;
                    user['apellidos'] = data.usuario.apellidos_usuario;
                    user['idUsuario'] = data.usuario.id_usuario;
                    user['imagen'] = data.usuario.imagen_usuario;
                    user['usuario'] = data.usuario.username;
                    user['rol'] = data.usuario.rol;

                    localStorage.setItem("user", JSON.stringify(user));

                    navigator.notification.alert("Bienvenid@ "+user['nombre'], function(){
                        window.location = "home.html";
                    }, "Registro creado correctamente", "Aceptar");    
                }else{
                    if(data.error)
                        navigator.notification.alert(data.error, null, "Error de registro", "Aceptar");
                    else
                        navigator.notification.alert("Error al registrarse, intenta nuevamente. Si el problema persiste, contacta al administrador: "+JSON.stringify(data), null, "Error de registro", "Aceptar");    
                }
                
            }).fail(function(data){
                //window.plugins.spinnerDialog.hide();
                SpinnerPlugin.activityStop();
                alert(JSON.stringify(data));
            });
        }
    });

}, false);


document.addEventListener("backbutton",backButton);

function backButton(){      
    window.location="index.html";
}
