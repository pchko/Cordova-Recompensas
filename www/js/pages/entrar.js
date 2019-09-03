function entrar() {
    //if (is_login()){
    //    window.location = 'home.html';
    //}
    //alert("algo2 ");
    // Form validate

//alert("valudo");
if (window.localStorage.getItem("number_tphone") != null && window.localStorage.getItem("number_tphone") != 'undefined'){

}else{
//alert("redirec");
 window.location = 'phone.html';    
}
//alert("valud 2");




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







    
          window.localStorage.removeItem("id_cliente");
        
       $("#ent_data").validate({
           rules: {
              
               cliente: {
                   required: true
       
               }
           },
           messages: {
               cliente: "Por favor escriba  el número de Cliente"
           },
           submitHandler: function(form) {
               
               
               //rev_id_cliente
               
                $.jsonp({
            
                                
                                             url: services_url + "rev_id_cliente",
                                             callbackParameter: "callback", timeout: time_out,
                                             data: {id: $('#cliente').val()},
                                             success: function(data) {
                                                if (data.id =="1") {
                                                     window.localStorage.setItem("id_cliente", $('#cliente').val());
                                                    window.location = 'home.html';
                                                }else{
                                                    alert("Lo sentimos el usuario no existe, por favor, verifique el número de cliente");
                                                }
                                             }
                });
                
                
               
               
               
               //alert($('#cliente').val());
              
           }
       });

}




function urgencia(){
    
alert("entro");
        //    window.plugins.phonenumber.get(success, failed);
        //function success(phonenumber) {
        //  alert("My number is " + phonenumber);
        //  $("#phone").val(phonenumber);
        //}
        //
        //function failed(phonenumber) {
        //    console.log("Error " + phonenumber);
        //}
        //
        
      var number_tphone =  window.localStorage.getItem("number_tphone");
      $("#phone").val(number_tphone);
      
      
        //if ($("#cliente").val() =="") {
        //    alert("Por favor escriba  el número de Cliente");
        //    return false;
        //}
        if ($("#geolocation").val() =="espere...") {
            alert("Por favor espere un momento estamos  ubicando su geo localización");
            var watchID =navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true, timeout: 10000, maximumAge: 10 });

                
                
            return false;
        }
        
        
        var geo = $("#geolocation").val();
        var cliente = $("#cliente").val();
        $("#id_usuario").val(cliente);
        var id_usuarioa = window.localStorage.getItem("id_cliente");
    //console.log($('#cue_con_data').serialize());
          $.jsonp({
            
                                
                                             url: services_url + "mandar_mail",
                                             callbackParameter: "callback", timeout: time_out,
                                             data: {data: $('#cue_con_data').serialize()},
                                             success: function(data) {
                                                alert("EN UN INSTANTE UN EJECUTIVO SE COMUNICARA");
                                             }
                });


}