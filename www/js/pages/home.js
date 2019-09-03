function home(){



/*  comentado  */
//id_array = 1;
//formularioi = "es_comprador=si&observaciones=paquete2&nombre=jose+de+jesus+&apellidos=ruiz+&telefono=58395959&calle=lopo+&numero=numerous+&colonia=Colo+&pais=pais+&estado=mexico+&ciudad=ciudad+&ruta=ruta+&region=centro&cliente=Las+&geolocation=19.5976981,+-99.0239814&foto1=file:\/\/\/storage\/emulated\/0\/Android\/data\/com.wiinikil.app\/cache\/1440142828055.jpg&foto2=file:\/\/\/storage\/emulated\/0\/Android\/data\/com.wiinikil.app\/cache\/1440142837653.jpg&file:\/\/\/storage\/emulated\/0\/Android\/data\/com_wiinikil_app\/cache\/1440142828055_jpg=&file:\/\/\/storage\/emulated\/0\/Android\/data\/com_wiinikil_app\/cache\/1440142837653_jpg=&user_id=252"
// "es_comprador":"si","observaciones":"paquete2","nombre":"jose de jesus ","apellidos":"ruiz ","telefono":"58395959","calle":"lopo ","numero":"numerous ","colonia":"Colo ","pais":"pais ","estado":"mexico ","ciudad":"ciudad ","ruta":"ruta ","region":"centro","cliente":"Las ","geolocation":"19.5976981, -99.0239814","foto1":"file:\/\/\/storage\/emulated\/0\/Android\/data\/com.wiinikil.app\/cache\/1440142828055.jpg","foto2":"file:\/\/\/storage\/emulated\/0\/Android\/data\/com.wiinikil.app\/cache\/1440142837653.jpg","file:\/\/\/storage\/emulated\/0\/Android\/data\/com_wiinikil_app\/cache\/1440142828055_jpg":"", "file:\/\/\/storage\/emulated\/0\/Android\/data\/com_wiinikil_app\/cache\/1440142837653_jpg":"","user_id":"252
//window.localStorage.setItem("formulario"+id_array, formularioi);
//window.localStorage.setItem("data_id", id_array);
/*  comentado  */


var id_usuario = window.localStorage.getItem("id_cliente");

$("#id_usuario").val(id_usuario);
var watchID = null;
if (watchID != null) {
            navigator.geolocation.clearWatch(watchID);
            watchID = null;
            alert("elimnio geo 2");
        }



function onSuccess(position) {
    var psos= position.coords.latitude      + ", "+ position.coords.longitude;


$("#geolocation").val(psos);
$("#id_usuario").val(id_usuario);

    navigator.geolocation.clearWatch(watchID);
    watchID = null;
}

function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n' +
          'Ocurrio un error: Por favor active la localizacion en su movil ' + '\n');
}

var watchID =navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true, timeout: 10000, maximumAge: 10 });





}


function urgencia(){
    
        //alert("Uregncia");
     //   
     //
     
     
     
     
      var number_tphone =  window.localStorage.getItem("number_tphone");
      $("#phone").val(number_tphone);
        var geo = $("#geolocation").val();
        var id_usuarioa = window.localStorage.getItem("id_cliente");
        
        
 
     //alert("Uregncia"+ services_url + "mandar_mail"+ datos);              
                   
          $.jsonp({
                                             url: "http://wiinikil.com/prospectos/index.php/api/service/mandar_mail",
                                             callbackParameter: "callback", timeout: 10000,
                                             data: {data: $('#cue_con_data').serialize()},
                                             success: function(data) {
                                                 alert("EN UN INSTANTE UN EJECUTIVO SE COMUNICARA");
                                                
                                             }
                });
                                                
    
    
}

function envio(){
    //window.localStorage.setItem("id_producto", agua);
    //var id_usuario = window.localStorage.setItem("id_cliente");
    window.location = 'pedidos.html';          
}