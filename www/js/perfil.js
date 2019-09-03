$(document).on("ready", function(){

	var divBtn = $("#divBtn");
	var passwordUser = $("#passwordUser");
	var spanPasswordUser = $("#spanPasswordUser");
	var local = window.localStorage;
	var btnUpdate = $("#btnUpdate");
	var divLogin = $("#divLogin");
	var nombre = $("#usuario");
    var nroCliente = $("#nroCliente");
    var telefono = $("#telefono");
    var mail = $("#correo");
    var password = $("#newPassword");
    var password1 = $("#newPassword1");
    var spanUsuario = $("#spanUsuario");
    var spanNroCliente = $("#spanNroCliente");
    var spanTel = $("#spanTel");
    var spanEmail = $("#spanEmail");
    var spanPassword = $("#spanNewPassword");
    var spanPassword1 = $("#spanNewPassword1");
    var validaUsuario = false;
    var validaCorreo = false;
    var validaTel = false;
    var validaNroCliente = false;
    var validaPassword = true;
    var form = $("#formUpdate");
	
	document.addEventListener("backbutton",backButton);

	function is_menu_visible(){
        var current_left = $('#menu').css('left');        
        return (current_left == "0px");
    }

    function hide_menu(){
        $('#menu').animate({left: "-105%"}, 500);
        if (typeof menuScroll !== 'undefined')
            menuScroll.scrollTo(0, 0);
    }

    function backButton(){    	
    	if (is_menu_visible()){    	
            hide_menu();        
        }else{            
        	window.location="home.html";
        }
    }

    passwordUser.on("change", function(){
    	var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;        
        if( !re.test($(this).val()) || $(this).val() == "" ){
            spanPasswordUser.text("Mínimo 6 caracteres y debe incluir al menos una mayúscula, una minúscula y un número.");
        }else{
        	if( $(this).val() !=  password.val() && $(this).val() != ""){
        		spanPasswordUser.text("");
        		divLogin.show();
        	}else{
        		spanPasswordUser.text("Tu contraseña actual y nueva deben ser diferentes");
        	}
        }
    });

    btnUpdate.on("click", function(){
		$.jsonp({
            url: "http://wiinikil.com/prospectos/index.php/api/resurtido/updateUser",
            callbackParameter: "callback", 
            timeout: 10000,
            data: form.serialize(),
            beforeSend: function(){
            	//divLogin.html('<center><img src="img/loading.gif" style="width:50px"/><br/><span style="color:maroon; font-weight:bold">Espere por favor...</span></center>');
            },            
            success: function(data) {
                if(data){
                    console.log(data);
                    var mensaje = "";
                    var aviso = "";
                    var callback_;
                    
                    switch(data.successful){
                        case 0:
                            mensaje = "Contraseña incorrecta. Intenta nuevamente";
                            aviso = "Error";                            
                            navigator.notification.alert(mensaje,function(){window.location.reload()}, aviso, "Aceptar");
                        break;

                        case 1:
                            mensaje = "Tu perfil se ha actualizado correctamente. Se cerrará la sesión para que los cambios surtan efecto";
                            aviso = "Éxito";
                            navigator.notification.alert(mensaje,
                                function(){
                                    local.clear();
                                    window.location = "index.html";
                                }, aviso, "Aceptar");
                        break;
                    }


                }                            
            },
            error: function(xOptions, textStatus){
                navigator.notification.alert("Hubo un problema al conectar a Coca-Cola, verifica que tengas conexión a internet e intenta de nuevo.",function(){}, "Error", "Aceptar");
                divLogin.html('<br><center><a id="btnUpdate" href="javascript:;" class="btn">Actualizar mis datos</a></center>');
            }
        });
    });

    function inicio(){
    	$("#usuario").val(local.getItem('nombre'));
    	$("#nroCliente").val(local.getItem('nroCliente'));
    	$("#telefono").val(local.getItem('telefono'));
    	$("#correo").val(local.getItem('correo'));
    	$("#idUser").val(local.getItem('idUser'));
    	divLogin.hide();
    }

	nombre.on("change", function(){
        var expr = /^[a-zA-Z_áéíóúñ\s]*$/;
        if(!validaEntrada(expr,$(this)) || $(this).val() == ""){
            spanUsuario.text("Ingresa un usuario válido");
            validaUsuario = false;
        }else{
            spanUsuario.text("");
            validaUsuario = true;
        }
    });

    nroCliente.on("change", function(){
        var expr = /[0-9]{7,7}/;
        if($(this).val() == "" || validaEntrada(expr,$(this))){
            spanNroCliente.text("");
            validaNroCliente = true;            
        }else{
            spanNroCliente.text("Ingresa un número de cliente válido");
            validaNroCliente = false;
        }
    });

    mail.on("change",function(){
        var expr = /^(\w+([\.\+\-_]?\w+)*@\w+([\.-_]?\w+)*(\.\w{2,4})+)$/;
        //var expr = /^[a-zA-Z0-9][a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
        if(!validaEntrada(expr,$(this),validaCorreo) || $(this).val() == ""){
            spanEmail.text("Ingresa un correo electrónico válido");
            validaCorreo = false;
        }else{
            spanEmail.text("");
            validaCorreo = true;
        }
    });

    telefono.on("change",function(){

        var expr = /[0-9]{10,10}/;
        if(!validaEntrada(expr,$(this),validaCorreo) || $(this).val() == ""){
            spanTel.text("Ingresa un número telefónico válido");
            validaTel = false;
        }else{
            spanTel.text("");
            validaTel = true;
        }
        
    });

    password.on("change", function(){
        var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;        
        if(re.test($(this).val())){
            spanPassword.text("");
            if($(this).val() != password1.val() && password1.val() != ""){
                spanPassword1.text("Las contraseñas no coinciden");
                validaPassword=false;
            }else{
                if(password.val() != "")
                    validaPassword=true;
                else
                    spanPassword.text("Ingrese una contraseña");
            }
        }else{
            spanPassword.text("Mínimo 6 caracteres y debe incluir al menos una mayúscula, una minúscula y un número.");
        }
    });

    password1.on("change", function(){
        var re1 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;        
        if(re1.test($(this).val())){
            if($(this).val() == password.val()){
                spanPassword1.text("");
                validaPassword=true;
            }else{
                if(password1.val() != "")
                    spanPassword1.text("Las contraseñas no coinciden");                    
                else
                    spanPassword1.text("Ingrese una contraseña");                
                validaPassword=false;
            }
        }else{
            spanPassword1.text("Mínimo 6 caracteres y debe incluir al menos una mayúscula, una minúscula y un número.");
        }
    });

    function validaEntrada(expression, input){
        var cadena = input.val();
        return expression.test(cadena.trim());
    }

    inicio();


});