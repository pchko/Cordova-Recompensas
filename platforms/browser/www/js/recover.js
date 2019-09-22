document.addEventListener('deviceready', function(){
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

    $("#formRecover").validate({
        rules: {
            usuario: {"required" : true, regex : "[A-za-z0-9]{6,15}"},
            mail: {"required" : true, regex : /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/ },
            nuevo_password: {"required" : true, regex : /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ },
            nuevo_repassword: {"required" : true, regex : /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, confirmPassword : true }
        },
        messages: {
            mail: {"required" : "Ingresa un correo electrónico", regex : "Ingresa un email valido"},
            usuario: {"required" : "Ingresa un usuario", regex : "Username no válido, mínimo 6 caracteres y puede contener unicamente letras y numeros"},
            nuevo_password: {"required" : "Ingresa una contraseña", regex : "La contraseña debe ser de al menos 8 caracteres, llevar una mayuscula, minuscula y un numero"},
            nuevo_repassword: {"required" : "Confirma tu contraseña", regex : "La contraseña debe ser de al menos 8 caracteres, llevar una mayuscula, minuscula y un numero"}
        },
        submitHandler: function(form, event){     
            event.preventDefault();
            var data = {mail : $("#mail").val(), usuario : $("#usuario").val(), nuevo_password : md5($("#nuevo_password").val()), 'key' : apiKey, 'm' : 'reset_password'};
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
                    navigator.notification.alert(data.mensaje, function(){
                        window.location = "index.html";
                    }, "Contraseña actualizada", "Aceptar");    
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