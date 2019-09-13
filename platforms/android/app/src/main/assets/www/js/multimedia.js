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
            
            if(data.length){
                var listRedencion = $("#listRedencion");
                if(data.length > 0){
                    $.each(data, function(index, object){

                        var card = $("<div>").css({margin: "0 auto", "border-radius": "8px", "padding":"2px 5px", border: "1px solid yellow", "background-color": "rgba(0,0,0,0.3)"});
                        var header = $("<div>").css({"padding":"0 2px"});
                        var body = $("<div>").css({"padding":"0 2px"});
                        var footer = $("<div>").css({"padding":"0 2px"});
                        var nombre = $("<p>").text("Nombre: "+object.nombre).css({color:"yellow"});

                        switch(object.tipo){
                            case "v":
                                var btn = $("<a>", {href:"javascript:;", class:"btn"}).text("Click aquí para ver el video");
                                btn.click(function(){
                                    var options = { dimBackground: true };
                                    SpinnerPlugin.activityStart("Espere por favor...", options);

                                    var fileTransfer = new FileTransfer();
                                    var uri = encodeURI(object.ruta);
                                    //alert(cordova.file.cacheDirectory);
                                    var today = new Date();
                                    var dd = today.getDate();
                                    var mm = today.getMonth() + 1; //January is 0!
                                    var yyyy = today.getFullYear();
                                    if (dd < 10) {
                                      dd = '0' + dd;
                                    } 
                                    if (mm < 10) {
                                      mm = '0' + mm;
                                    } 
                                    var today = dd+'-'+mm+'-'+yyyy;
                                    fileTransfer.download(
                                        uri,
                                        cordova.file.cacheDirectory+today+"_"+object.id+"_file."+object.ext, //Se guarda en la caché de la app (El SO puede elminarlo)
                                        function(entry) {
                                            SpinnerPlugin.activityStop();
                                            //alert("download complete: " + entry.toURL());
                                            //Se abre el archivo
                                            cordova.plugins.fileOpener2.open(
                                                entry.toURL(),
                                                object.mime,
                                                {
                                                    error : function(e) {
                                                        //SpinnerPlugin.activityStop();
                                                        navigator.notification.alert('Error al abrir el contenido: ' + e.status + ' - Motivo: ' + e.message+". Verifica que tengas una aplicación que permita abrir el contenido");
                                                    },
                                                    success : function () {

                                                        //alert('file opened successfully');
                                                    }
                                                }
                                            );
                                        },

                                        function(error) {
                                            SpinnerPlugin.activityStop();
                                            navigator.notification.alert("Error al obtener el contenido: "+error.source+". Codigo: "+error.code);
                                            /*alert("download error source " + error.source);
                                            alert("download error target " + error.target);
                                            alert("download error code" + error.code);*/
                                        }
                                    );

                                });
                                var logo = $("<img>", { src : "img/video-play-r.png" }).css({height: "auto", width:"50%"});
                                card.append(header.append(logo).css({"text-align":"center"})).append(body.append(nombre)).append(footer.append(btn));
                            break;

                            case "b":
                                var img = $("<img>", { src : object.ruta }).css({width : "100%", "border-radius" : "8px"});
                                card.append(header.append(img)).append(body.append(nombre));
                            break;

                        }
                        
                        listRedencion.append(card).append("<br>");

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