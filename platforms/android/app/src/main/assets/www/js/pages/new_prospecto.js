function new_prospecto() {
        
         var number_tphone =  window.localStorage.getItem("number_tphone");
      $("#phone").val(number_tphone);
      
      
        
        var d = new Date();
        
        
$("#fecha").val( d.getFullYear() + "-" + (d.getMonth() +1)  + "-" +  d.getDate() +" " +d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());
        

        
        
        
var id_usuario = window.localStorage.getItem("id_cliente");
//alert(id_usuario);

$("#cliente").val(id_usuario);




$.jsonp({
                                                     url: services_url + "get_empleaado",
                                                     callbackParameter: "callback", timeout: time_out,
                                                     data: {data: id_usuario},
                                                     success: function(data) {
                                                      
                                                        if (data.id == '1')
                                                        {
                                                               console.log(data.d)
                                                              var revistas = eval(data.d);
                                                              var count = revistas.length;
                                                    if (count > 0)
                                                    {
                                                        for (var i = 0; i < revistas.length; i++)
                                                        {
                                                           
                                                            $("#nombre").val(revistas[i].nombre + " "+revistas[i].apellidos)
                                                            $("#ruta").val(revistas[i].ruta)
                                                            $("#direccion").val(revistas[i].calle +" "+ revistas[i].numero +" "+revistas[i].colonia)
                                                            $("#telefono").val(revistas[i].telefono)
                                                            
                                                        }
                                                    }
                                                    else
                                                    {
                                                        $('.content').html('<p>No existen publicaciones para mostrar</p>');
                                                        hide_overlay();
                                                    }
                                                            
                                                        }else
                                                        {
                                                            notify_error();
                                                        }
                                                     }
                        });
                        


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
          'Ocurrio un error: Por favor active la localizacion en su movil ' + '\n ');
}

var watchID =navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true, timeout: 10000, maximumAge: 10 });



        
        
           var id_array;

        //navigator.geolocation.getCurrentPosition(onSuccess);

var data_id =  (window.localStorage.getItem("data_id") != null && window.localStorage.getItem("data_id") != 'undefined');




    if (data_id){

        if (data_id == "NaN"){

            $("#id").val('1')
            id_array = 1;
        }else{
            id_ar = window.localStorage.getItem("data_id");
                    i = parseInt(id_ar);
                    j =  parseInt(1);
                    id_array = i + j;
                    $("#id").val(id_array);
        }

        // alerta(id_array);
    }else{

        if (data_id == "NaN"){

                $("#id").val('1')
                id_array = 1;
        }else{
            $("#id").val('1')
            id_array = 1;
        }
    }
    



    
 $("#reg_data").validate({
        rules: {
            nombre: "required",
            ruta: "required",
            direccion: "required",
            telefono: "required"
        },

        messages: {
            nombre: "Por favor escriba su nombre",
            ruta: "Por favor escriba su apellidos",
            direccion: "Por favor escriba su télefono",
            telefono: "Por favor escriba su calle"
        },
        submitHandler: function(form) {
          
            show_overlay();
            
            //alert(id_array);
            var formularioi = $('#reg_data').serialize();
            console.log(formularioi);
            window.localStorage.setItem("formulario"+id_array, formularioi);
            window.localStorage.setItem("data_id", id_array);
            hide_overlay();
            alerta("Almacenado", "totalpedidos.html");
 
        }
    });
   




}


function confirmar(){
confirmar=confirm("¿LOS DATOS ESTAN CORRECTOS?");
        if (confirmar){
        
         $("#reg_data").submit();
         
         //alert("enviando");
         
         
                 //$("#reg_data").validate({
                 //       rules: {
                 //           nombre: "required",
                 //           ruta: "required",
                 //           direccion: "required",
                 //           telefono: "required"
                 //       },
                 //
                 //       messages: {
                 //           nombre: "Por favor escriba su nombre",
                 //           ruta: "Por favor escriba su apellidos",
                 //           direccion: "Por favor escriba su télefono",
                 //           telefono: "Por favor escriba su calle"
                 //       },
                 //       submitHandler: function(form) {
                 //           show_overlay();
                 //           var formularioi = $('#reg_data').serialize();
                 //           console.log(formularioi);
                 //           window.localStorage.setItem("formulario"+id_array, formularioi);
                 //           window.localStorage.setItem("data_id", id_array);
                 //           hide_overlay();
                 //           alerta("Almacenado", "totalpedidos.html");
                 //
                 //       }
                 //   });
        
        }else{
        
        
                  $.jsonp({
                                                     url: services_url + "mandar_mail",
                                                     callbackParameter: "callback", timeout: time_out,
                                                     data: {data: $('#reg_data').serialize()},
                                                     success: function(data) {
                                                        alerta("Almacenado", "index.html");
                                                        //alert("Se ha enviado una mail de emergencia");
                                                     }
                        });
        }
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
                                             url: services_url + "mandar_mail",
                                             callbackParameter: "callback", timeout: time_out,
                                             data: {data: $('#cue_con_data').serialize()},
                                             success: function(data) {
                                                 alert("EN UN INSTANTE UN EJECUTIVO SE COMUNICARA");
                                                
                                             }
                });
                                                
    
    
}