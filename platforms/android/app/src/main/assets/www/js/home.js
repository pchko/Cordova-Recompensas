document.addEventListener("deviceready",function(){

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
        var video = $("<video>", {id : "myvideo", autoplay : true, controls : true}).css({height:"200px", width:"100%"});
        var source = $("<source>",{src: "img/principal.mp4", type:"video/mp4"});
        $("#video").append(video.append(source));

    	var anuncio = $(".alert");
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
    }else{
        localStorage.clear();
        window.location = "index.html";
    }
}, false);