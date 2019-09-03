//document.addEventListener('deviceready',function(){
    alert("ready");
    //alert(localStorage.getItem('user'));
    if(localStorage.getItem("user") != null || localStorage.getItem("user") != undefined){
        var user = JSON.parse(localStorage.getItem('user'));
        //$("#id_usuario").val(user.idUsuario);
        var apiKey = "PXLALA";
        var link = "http://pixanit.com/lala/ws/index.php";
        var data = {m: 'multimedia', key : apiKey};
        var beforeFunction = function(){
            var options = { dimBackground: true };
            SpinnerPlugin.activityStart("Obteniendo contenido multimedia, espere por favor", options);
        };

        var successFunction = function(data){
            alert(JSON.stringify(data));
            if(data.length){
                var listRedencion = $("#listRedencion");
                if(data.length > 0){
                    $.each(data, function(index, object){

                        var card = $("<div>").css({margin: "0 auto", "border-radius": "8px", "padding":"2px 5px", border: "1px solid green"});
                        var header = $("<div>").css({"padding":"0 2px"});
                        var body = $("<div>").css({"padding":"0 2px"});
                        var footer = $("<div>").css({"padding":"0 2px"});
                        var nombre = $("<p>").text("Nombre: "+object.nombre).css({color:"maroon"});

                        switch(object.tipo){
                            case "v":
                                var btn = $("<a>", {href:"javascript:;", class:"btn"}).text("Click para ver el video");
                                btn.click(function(){

                                    var fileTransfer = new FileTransfer();
                                    var uri = encodeURI("https://cdn0.talenteca.com/thumbnail-images/TK_POST_THUMBNAIL_PIC-2019_04_30_10_16_37-90817676386344698917.jpg");
                                    alert(cordova.file.cacheDirectory);
                                    fileTransfer.download(
                                        uri,
                                        cordova.file.cacheDirectory,
                                        function(entry) {
                                            alert("download complete: " + entry.toURL());
                                        },
                                        function(error) {
                                            alert("download error source " + error.source);
                                            alert("download error target " + error.target);
                                            alert("download error code" + error.code);
                                        }
                                    );


                                    /*alert("click");
                                    cordova.plugins.fileOpener2.open(
                                        object.ruta,
                                        object.mime,
                                        {
                                            error : function(e) {
                                                alert('Error status: ' + e.status + ' - Error message: ' + e.message);
                                            },
                                            success : function () {
                                                alert('file opened successfully');
                                            }
                                        }
                                    );*/
                                });    
                                card.append(header.append(nombre)).append(footer.append(btn));
                            break;

                            case "b":
                                var img = $("<img>", { src : object.ruta }).css({width : "100%"});
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

//}, false);

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