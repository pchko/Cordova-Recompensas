$(document).on("ready",function(){

	var btnPedido = $("#btnPedido");
    var btnServicio = $("#btnServicio");
	var content = $(".content");
	var anuncio = $(".alert");
    var divServicio = $("#divServicio");
    var session = window.sessionStorage;
    var local = window.localStorage;
    var psos = "Espere...";
    var watchID = null;

	if(window.localStorage.getItem("nroCliente") == null && window.localStorage.getItem("nroCliente") == 'undefined'){
		btnPedido.remove();		
	}else{
		content.css("min-height","750px");
	}

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
        	anuncio.show();
        }
    }

    btnPedido.on("click",function(){

        if(window.sessionStorage.getItem("nombre") == null){
            
        	$.jsonp({
                url: "http://wiinikil.com/prospectos/index.php/api/resurtido/getProspecto",
                callbackParameter: "callback", timeout: 10000,
                data: {'nroCliente' : window.localStorage.getItem("nroCliente")},
                beforeSend: function(){
                    divServicio.html('<center><img src="img/loading.gif" style="width:50px"/><br/><span style="color:maroon; font-weight:bold">Conectando...</span></center>');
                },
                success: function(data){
                    console.log(data);
                    if(data && data.successful == 1){
                        session.setItem("nombre", data.result.nombre);
                        session.setItem("direccion", data.result.direccion);
                        session.setItem("estado", data.result.estado);
                        session.setItem("pais", data.result.pais);
                        session.setItem("ubicacion", data.result.ubicacion);
                        session.setItem("telefono", data.result.telefono);
                        session.setItem("ruta", data.result.ruta);
                        window.location="pedido.html";
                    }else{
                        navigator.notification.alert("El número de cliente asociado a tu cuenta no corresponde a uno de nuestros clientes registrados. Elige la opción Solicitar Asistencia",errorProspecto, "Error", "Aceptar");
                    }
                },
                error: function(data){
                    navigator.notification.alert("Hubo un problema al conectar a Coca-Cola. Intenta nuevamente por favor.",
                    errorProspecto, "Error", "Aceptar");
                }
            });
        }else{
            window.location="pedido.html";
        }
    });

    btnServicio.on("click", function(){        
        navigator.notification.confirm("Se enviará un mensaje de alerta con tu ubicación para solicitar asistencia. ¿Deseas continuar?",onConfirm,"Atención",['Continuar', 'Cancelar']);
    });

    function errorProspecto(){
        divServicio.html('<center><div><a href="javascript:;" id="btnPedido" class="btn">Solicitar Pedido</a></div><br><div><a href="javascript:;" id="btnServicio" class="btn">Solicitar Asistencia</a></div></center>');
    }

    function onConfirm(buttonIndex) {
        switch(buttonIndex){
            case 1:
                divServicio.html('<center><img src="img/loading.gif" style="width:50px"/><br/><span style="color:maroon; font-weight:bold">Conectando...</span></center>');
                watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true, timeout: 6000, maximumAge: 7000 });
            break;
        }
    }

    function onSuccess(position) {

        psos= position.coords.latitude      + ", "+ position.coords.longitude;                
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
        enviarMail();
    }

    function onError(error) {
        navigator.notification.alert("Para solicitar asistencia es necesario activar el GPS en su móvil.",
            function(){
                window.location.reload();
            },
            "Error",
            "Aceptar");
    }

    function enviarMail(){
        $.jsonp({
            url: "http://wiinikil.com/prospectos/index.php/api/service/mandar_mail",
            callbackParameter: "callback", timeout: 10000,
            data: {phoneU : local.getItem('telefono'), correo : local.getItem('correo'), geolocation1 : psos, user : local.getItem('nombre')},
            success: function(data){
                console.log(data);
                navigator.notification.alert("La alerta se ha enviado correctamente, en un instante un ejecutivo se comunicará.",
                function(){window.location="home.html"}, "Éxito", "Aceptar");

            },
            error: function(data){
                navigator.notification.alert("Hubo un problema al conectar a Coca-Cola. Intenta nuevamente por favor.",
                function(){window.location.reload()}, "Error", "Aceptar");
            }
        });
    }
});