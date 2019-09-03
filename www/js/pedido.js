$(document).on("ready",function(){

	var btnPedido = $("#btnPedido");
	var content = $(".content");
	var anuncio = $(".alert");
    var local = window.localStorage;
    var session = window.sessionStorage;
    var d = new Date();    
    var dia = d.getDate() < 10 ? '0'+d.getDate() : d.getDate();
    var watchID = null;
	
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

    $("#close_alert").on("click",function(){
        $(".alert").hide();        
    });

    
    function inicio(){
        $(".alert").hide();
        $("#cliente").val(local.getItem('nroCliente'));
        $("#fecha").val(dia  + "-" + d.getMonth()+1  + "-" +  d.getFullYear() +" " +d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());
        $("#nombre").val(session.getItem('nombre'));
        $("#ruta").val(session.getItem('ruta'));
        $("#direccion").val(session.getItem('direccion'));
        $("#telefonoP").val(session.getItem('telefono'));
        $("#geolocation").val(session.getItem('ubicacion'));
        $("#phoneU").val(local.getItem('telefono'));
        
        
    }

    function onSuccess(position) {

        var psos= position.coords.latitude      + ", "+ position.coords.longitude;        
        $("#geolocation1").val(psos);
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
        enviarMail();
    }

    function onError(error) {
        navigator.notification.alert("Para solicitar un pedido es necesario activar el GPS en su móvil.",
                function(){window.location.reload();}, "Error", "Aceptar");
    }

    btnPedido.on("click",function(){
        watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true, timeout: 6000, maximumAge: 7000 });
    });

    function enviarMail(){
        $.jsonp({
            url: "http://wiinikil.com/prospectos/index.php/api/service/mandar_mail",
            callbackParameter: "callback", timeout: 10000,
            data: $("#formPedido").serialize(),
            success: function(data){
                console.log(data);
                navigator.notification.alert("El pedido se ha enviado correctamente, en un instante un ejecutivo se comunicará.",
                function(){window.location="home.html"}, "Éxito", "Aceptar");
            },
            error: function(data){
                navigator.notification.alert("Hubo un problema al conectar a Coca-Cola. Intenta nuevamente por favor.",
                function(){window.location.reload()}, "Error", "Aceptar");
            }
        });
    }

    inicio();

});