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

    //alert(localStorage.getItem('user'));
    if(localStorage.getItem("user") != null || localStorage.getItem("user") != undefined){
        var user = JSON.parse(localStorage.getItem('user'));
        //$("#id_usuario").val(user.idUsuario);
        var apiKey = "PXLALA";
        var link = "https://pixanit.com/lala/ws/index.php";
        var data = {m: 'multimedia', key : apiKey};
        var beforeFunction = function(){
            var options = { dimBackground: true };
            SpinnerPlugin.activityStart("Obteniendo contenido multimedia, espere por favor", options);
        };

        var successFunction = function(data){
            console.log(data);
            if(data.length){
                var listRedencion = $("#listRedencion");
                if(data.length > 0){
                    $.each(data, function(index, object){

                        var li = $("<li>",{ "data-target" : "#myCarousel", "data-slide-to" : index, class : (index == 0 ? "active" : "") });
                        $("#indicador").append(li);
                        
                        var item = $("<div>",{class : ( index == 0 ? "item active" : "item")});
                        switch(object.tipo){
                            case "v":

                                var video = $("<video>", {id : "myvideo", autoplay : false, controls : true, poster : object.poster}).css({ width:"100%", height : "200px"});
                                var source = $("<source>",{src: object.ruta, type: object.mime});
                                
                                /*
                                var divTags = $("<div>",{class:"carousel-caption d-none d-md-block"});
                                var title = $("<h5>").text(object.nombre);
                                divTags.append(title);
                                item.append(divTags);
                                */
                                item.append(video.append(source));
                                
                                $("#carrusel").append(item);

                                video.on("play",function(){
                                    $("#myCarousel").carousel('pause');
                                });

                                video.on("ended",function(){
                                    $("#myCarousel").carousel('cycle');
                                });
                                
                            break;

                            case "b":
                                var img = $("<img>", { src : object.ruta, alt : object.nombre }).css({width : "100%", height : "200px"});
                                item.append(img);
                                $("#carrusel").append(item);

                                img.click(function(){
                                    $("#myCarousel").carousel('pause');
                                });
                            break;
                        }

                        $(".carousel-control").click(function(){
                            $("#myCarousel").carousel('cycle');
                        });

                        li.click(function(){
                            $("#myCarousel").carousel('cycle');
                        });
                    });    
                }else{
                    listRedencion.html("<h2><u>No hay contenido multimedia para mostrar</u></h2>");
                }
                
            }
            SpinnerPlugin.activityStop();

        };

        var failFunction = function(data){
            SpinnerPlugin.activityStop();
            alert(JSON.stringify(data));  
        };

        connectServer(link, data, beforeFunction, successFunction, failFunction);

    }else{
        localStorage.clear();
        window.location="index.html";
    }

}, false);

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

document.addEventListener("backbutton",backButton);
function backButton(){      
    window.location = "home.html";
}