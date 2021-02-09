if(localStorage.getItem("user") == null || localStorage.getItem("user") == undefined){
    localStorage.clear();
    window.location = "index.html";
}

document.addEventListener("deviceready",function(){

    if(localStorage.getItem("user") != null || localStorage.getItem("user") != undefined){

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

        var apiKey = "PXLALA";
        var link = "https://pixanit.com/lala/ws/index.php";
        var data = {m: 'banners', key : apiKey};
        var beforeFunction = function(){
            var options = { dimBackground: true };
            SpinnerPlugin.activityStart("Espere por favor", options);
        };

        var successFunction = function(data){
            
            if(data.length){
                if(data.length > 0){
                    localStorage.setItem("banners", JSON.stringify(data));
                    $.each(data, function(index, object){

                        var li = $("<li>",{ "data-target" : "#carrouselBanners", "data-slide-to" : index, class : (index == 0 ? "active" : "") });
                        $("#indicadorBanners").append(li);
                        
                        var item = $("<div>",{class : ( index == 0 ? "item active" : "item")});
                        switch(object.tipo){
                            case "b":
                                var img = $("<img>", { src : object.ruta, alt : object.nombre }).css({width : "auto", height : "200px", margin : "0 auto"});
                                item.append(img);
                                $("#carrusel2").append(item);

                                img.click(function(){
                                    $("#carrouselBanners").carousel('pause');
                                });
                            break;
                        }

                        $(".carousel-control").click(function(){
                            $("#carrouselBanners").carousel('cycle');
                        });

                        li.click(function(){
                            $("#carrouselBanners").carousel('cycle');
                        });
                    });    
                }
            }
            SpinnerPlugin.activityStop();

        };

        var failFunction = function(data){
            SpinnerPlugin.activityStop();
            alert(JSON.stringify(data));  
        };

        connectServer(link, data, beforeFunction, successFunction, failFunction);

        function connectServer(link, data, beforeFunction, successFunction, failFunction){
            $.ajax({
                crossDomain:true,
                type: "POST",
                timeout: 10000,
                url: link,
                data: data,
                dataType: "json",
                beforeSend: function(){
                    beforeFunction && beforeFunction();
                }
            }).done(function(data){
                successFunction && successFunction(data);
                console.log(data);
            }).fail(function(data){
                failFunction && failFunction(data);
                console.log(data);
            });
        }

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