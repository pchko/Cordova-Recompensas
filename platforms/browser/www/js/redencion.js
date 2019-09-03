document.addEventListener('deviceready',function(){
    //alert("ready");
    //alert(localStorage.getItem('user'));
    if(localStorage.getItem("user") != null || localStorage.getItem("user") != undefined){
        var user = JSON.parse(localStorage.getItem('user'));
        //$("#id_usuario").val(user.idUsuario);
        var apiKey = "PXLALA";
        var link = "http://pixanit.com/lala/ws/index.php";
        var data = {m: 'lista_premios', key : apiKey};
        var beforeFunction = function(){
            var options = { dimBackground: true };
            SpinnerPlugin.activityStart("Obteniendo listado de premios, espere por favor", options);
        };

        var successFunction = function(data){
            SpinnerPlugin.activityStop();
            if(data.length){
                var listRedencion = $("#listRedencion");
                if(data.length > 0){
                    $.each(data, function(index, object){

                        var card = $("<div>").css({margin: "0 auto", "border-radius": "8px", "padding":"2px 5px", border: "1px solid green"});
                        var header = $("<div>").css({"padding":"0 2px"});
                        var body = $("<div>").css({"padding":"0 2px"});
                        var footer = $("<div>").css({"padding":"0 2px"});
                        var img = $("<img>", { src : object.imagen }).css({width : "100%"});
                        var nombre = $("<p>").text("Nombre: "+object.nombre_producto).css({color:"maroon"});
                        var marca = $("<p>").text("Marca: "+object.marca).css({color:"maroon"});
                        var descripcion = $("<p>").text("Descripción: "+object.descripcion).css({color:"maroon", "text-align": "justify"});
                        var puntos = $("<p>").text("Valor puntos: "+object.puntos).css({color:"maroon"});
                        var btn = $("<a>", {href:"javascript:;", class:"btn", "data-action" : object.id_reward}).text("Redimir producto");

                        card.append(header.append(img)).append(body.append(nombre).append(marca).append(descripcion).append(puntos).append(footer.append(btn)));

                        listRedencion.append(card).append("<br>");

                        btn.click(function(){
                            var link1 = "http://pixanit.com/lala/ws/index.php";
                            var data1 = {m: 'redime', key : apiKey, id_usuario : user.idUsuario, id_producto : $(this).attr("data-action")};
                            var beforeFunction1 = function(){
                                var options = { dimBackground: true };
                                SpinnerPlugin.activityStart("Redimiendo el producto, espere por favor", options);
                            };
                            var successFunction1 = function(data){
                                SpinnerPlugin.activityStop();
                                if(data.result){
                                    switch(data.result){
                                        case 1:
                                            navigator.notification.alert("Felicidades "+user.nombre+", tu redención se ha registrado correctamente",  function(){
                                                window.location = "home.html";
                                            }, "Éxito", "Aceptar");
                                        break;

                                        case 2:
                                            navigator.notification.alert("Ocurrio un error al redimir el producto, intenta nuevamente. Si el problema persiste, contacta al administrador.", null, "Error al redimir", "Aceptar");
                                        break;

                                        case 3:
                                            navigator.notification.alert("Lo sentimos, no tienes los puntos suficientes para redimir este producto", null, "Puntos insuficientes", "Aceptar");
                                        break;
                                    }
                                }
                                
                            };
                            var failFunction1 = function(data){
                                navigator.notification.alert("Verifica tu conexión e intenta nuevamente.", null, "Error de conexión.", "Aceptar");
                            };

                            connectServer(link1, data1, beforeFunction1, successFunction1, failFunction1);
                        });
                        SpinnerPlugin.activityStop();

                    });    
                }else{
                    listRedencion.html("<h2><u>No hay productos para redimir</u></h2>");
                }
                
            }

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
        timeout: 8000,
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