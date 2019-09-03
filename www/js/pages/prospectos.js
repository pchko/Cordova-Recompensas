function prospectos() {

       show_overlay();


    var data_id =  (window.localStorage.getItem("data_id") != null && window.localStorage.getItem("data_id") != 'undefined');
    //data_id =2;
    if(data_id)
    {

     id_array = window.localStorage.getItem("data_id");
     total = parseInt(id_array);
     //total = 2;

        var div;
      for (var i = 1; i <= total; i++)
      {

            array = parseQuery(window.localStorage.getItem("formulario"+i))

            //array = parseQuery('cliente=1234&nombre=jose+de+jues&ruta=ruta&direccion=direccion&telefono=34567890&geolocation=espere...');
            



              var div = '<div><h3>' + array.cliente + ' '+  array.nombre + '</h3><br />  <div class="delimiter"></div>';

            $('#prospecto').append(div);
      }


        hide_overlay();

    }else{

            $('#prospecto').html('<p>No se encontraron registros grabados.</p>');
            hide_overlay();
    }



}

  
  
       function envio_sistema(){
        var data_id =  (window.localStorage.getItem("data_id") != null && window.localStorage.getItem("data_id") != 'undefined');
        
        if (data_id == "NaN"){
             alert("NaN");
             id_array = 1;
          }

           
            id_array = window.localStorage.getItem("data_id");
            
         
         total = parseInt(id_array);
          //total = 2;
         
         $("#total").append("Por Favor espere, no cierre la aplicación<br>");
        $("#total").append("<br >Total de registro:" + total);
        $("#enviar").css("display","none");



        
        
    
         var div;
         for (var i = 1; i <= total; i++)
         {
                show_overlay();
                array_send = sende(window.localStorage.getItem("formulario"+i), i, total);
                //console.log(array_send+"=="+total);
                //if (array_send == total) {
                //    alert("enviados");
                //}
         }
         hide_overlay();



    }
    
    function sende(datos, i, total){
    
        
       $.jsonp({
                                             url: services_url + "rev_id",
                                             callbackParameter: "callback", timeout: time_out,
                                             data: {data: datos},
                                             success: function(data) {
                                                 if (data.id == '1')
                                                 {     
                                                     array = parseQuery(window.localStorage.getItem("formulario"+i));
                                                     //array = parseQuery('cliente=1234&nombre=jose+de+jues&ruta=ruta&direccion=direccion&telefono=34567890&geolocation=espere...');
                                                      var borrar;
                                                    borrar ="formulario"+i;
                                                    window.localStorage.removeItem(borrar);
                                                    id_ar = window.localStorage.getItem("data_id");
                                                    k = parseInt(id_ar);
                                                    l =  parseInt(1);
                                                    id_array = k - l;
                                                    window.localStorage.removeItem("data_id");
                                                    if (isNaN(id_array)){
                                                        hide_overlay();
                                                    }else{
                                                    }
                                                    if(id_array == "0" || id_array == 0 || id_array == "NaN" || id_array == NaN ){ 
                                                        hide_overlay();
                                                      
                                                    }
       
                                                     hide_overlay();
                                                    
                                                  }
                                                 else
                                                 {
                                                  $("#error").append("<br >" + data.d);   
                                                 }
                                                 
                                                var totale = "0";
                                                totale = parseInt(totale) + parseInt(i);
                                                //console.log("succes= "+totale+"=="+total);
                                                if (totale == total) {
                                                    alert("Se ha enviado");
                                                    $('#prospecto').html('<p>No se encontraron registros grabados.</p>');
                                                    
                                                }
                                                
    
    
                                             },
                                             error: function(xOptions, textStatus) {
                                                 notify_offline();
                                             }
            });
            
    
         
        
    }
    
    
    