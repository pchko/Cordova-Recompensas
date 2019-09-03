function ver_prospecto() {
    show_overlay();
    var id = $_GET('id');

    //alerta('id ='+ id);


 var user_id_sis = window.localStorage.getItem("user_id");


$("#user_id").val(user_id_sis);

 if (typeof id !== 'undefined')
    {

       hide_overlay();
        array = parseQuery(window.localStorage.getItem("formulario"+id));
       // alert(array.foto1);
        //alert(array.foto2);
         var imagen1 = (array.foto1 !== null)?(array.foto1):('');
         var imagen2 = (array.foto2 !== null)?(array.foto2):('');





        $('#foto-perfil1').attr('src', imagen1);
        $('#foto-perfil2').attr('src', imagen2);






           var id_selec;
        switch(array.es_comprador)
        {

            case "no":
                id_selec = "0";
            break;
            case "si":
                id_selec = "1";
            break;
            case "noa":
                id_selec = "2";
            break;
            case "reconquista":
                id_selec = "3";
            break;
        }


            document.getElementById("es_comprador").selectedIndex = id_selec;
           var id_selec_ob;
        switch(array.observaciones)
        {

            case "paquete1":
                id_selec_ob = "1";
            break;
            case "paquete2":
                id_selec_ob = "2";
            break;
            case "paquete3":
                id_selec_ob = "3";
            break;
            case "paquete4":
                id_selec_ob = "4";
            break;
            case "paquete5":
                id_selec_ob = "5";
            break;
        }
        document.getElementById("observaciones").selectedIndex = id_selec_ob;

        $("#nombre").val(array.nombre.replace("+", " ") );
        $("#apellidos").val(array.apellidos.replace("+", " "));
        $("#telefono").val(array.telefono);
        $("#calle").val(array.calle.replace("+", " "));
        $("#numero").val(array.numero.replace("+", " "));
        $("#colonia").val(array.colonia.replace("+", " "));
        $("#pais").val(array.pais.replace("+", " "));
        $("#estado").val(array.estado.replace("+", " "));
        $("#ruta").val(array.ruta.replace("+", " "));
        $("#ciudad").val(array.ciudad.replace("+", " "));
        $("#cliente").val(array.cliente.replace("+", " "));
        $("#geolocation").val(array.geolocation.replace("+", " "));

            var reg;

         switch(array.region)
                {

                    case "centro":
                        reg = "1";

                    break;
                    case "oriente":
                        reg = "2";

                    break;
                    case "mezquital":
                        reg = "3";

                    break;
                    case "sur":
                        reg = "4";

                    break;

                }

                document.getElementById("region").selectedIndex = reg;

                hide_overlay();
                var id_selec_lo;


                var localizacion1 = myTrim(array.localizacion);
                switch(localizacion1)
                        {

                            case "dentro+de+rango":
                                id_selec_lo = "1";

                            break;
                            case "fuera+de+rango":
                                id_selec_lo = "2";

                            break;

                        }

                        document.getElementById("region").selectedIndex = id_selec_lo;







                          hide_overlay();




            $( "#reg_data" ).submit(function( event ) {

                //alert("submit");



            });



       $("#reg_data").validate({
              rules: {
                  es_comprador: "required",
                  observaciones: "required",
                  nombre: "required",
                  apellidos: "required",
                  telefono: "required",
                  calle: "required",
                  numero: "required",
                  colonia: "required",
                  pais: "required",
                  estado: "required",
                  ciudad: "required",
                  ruta: "required",

                  localizacion: "required"
              },

              messages: {
                  nombre: "Por favor escriba su nombre",
                  apellidos: "Por favor escriba su apellidos",
                  telefono: "Por favor escriba su télefono",
                  calle: "Por favor escriba su calle",
                  numero: "Por favor escriba su número",
                  colonia: "Por favor escriba su colonia",
                  pais: "Por favor escriba su pais",
                  estado: "Por favor escriba su estado",
                  ciudad: "Por favor escriba su ciudad",
                  ruta: "Por favor escriba su ruta",
                  localizacion: "Por favor escriba su localizacion"


              },
              submitHandler: function(form) {
              //var gatheredPosts = new Array();
              //alerta("envio");



                        show_overlay();
                             $.jsonp({
                                             url: services_url + "subir",
                                             callbackParameter: "callback", timeout: time_out,
                                             data: {data: $('#reg_data').serialize()},
                                             success: function(data) {
                                                 if (data.d == '1')
                                                 {
                                                    //alert(data.id);

                                                     function reg_success()
                                                     {
                                                       //alert(data.id);

                                                     }
                                                     if (array.foto1 != '')
                                                     {
                                                        var IMG1 = array.foto1;
                                                        //alert(IMG1);
                                                         var options = new FileUploadOptions();
                                                         options.fileKey = "file";
                                                         options.fileName = IMG1.substr(IMG1.lastIndexOf('/') + 1);
                                                         options.mimeType = "image/jpeg";
                                                         options.chunkedMode = true;
                                                         var ft = new FileTransfer();
                                                         ft.upload(IMG1, encodeURI(services_url + "up_img?id=" + data.id +"&foto1=1"), win1, fail1, options, true);
                                                     }


                                                      if (array.foto2 != '')
                                                           {
                                                            var IMG2 = array.foto2;
                                                            //alert(IMG2);
                                                               var options = new FileUploadOptions();
                                                               options.fileKey = "file";
                                                               options.fileName = IMG2.substr(IMG2.lastIndexOf('/') + 1);
                                                               options.mimeType = "image/jpeg";
                                                               options.chunkedMode = true;
                                                               var ft = new FileTransfer();
                                                               ft.upload(IMG2, encodeURI(services_url + "up_img?id=" + data.id +"&foto2=2"), win2, fail2, options, true);
                                                           }
                                                                // hide_overlay();

                                                     function win1(r) {
                                                       alert("Foto 1: bien");
                                                     }

                                                     function fail1(error) {
                                                                alert("An error has occurred: Code = " + error.code);
                                                                 alert("upload error source " + error.source);
                                                                 alert("upload error target " + error.target);
                                                        alerta("Ha ocurrido un error al subir la imagen 1");

                                                     }

                                                     function win2(r) {
                                                        alert("Foto 2: bien");
                                                     }

                                                     function fail2(error) {
                                                         alert("An error has occurred: Code = " + error.code);
                                                      alert("upload error source " + error.source);
                                                      alert("upload error target " + error.target);

                                                     }

                                                     var borrar;
                                                     borrar ="formulario"+id;
                                                    window.localStorage.removeItem(borrar);

                                                    id_ar = window.localStorage.getItem("data_id");
                                                    window.localStorage.removeItem("data_id");
                                                    i = parseInt(id_ar);
                                                    j =  parseInt(1);
                                                    id_array = i - j;
                                                    window.localStorage.setItem("data_id", id_array);


                                                    alert(id_array);
                                                    hide_overlay();

                                                    //window.location = 'prospectos.html';

                                                 }
                                                 else
                                                 {
                                                     notify_error();
                                                 }
                                             },
                                             error: function(xOptions, textStatus) {
                                                 notify_offline();
                                             }
                                         })





              }
         });







    hide_overlay();
    }
    else
    {
        notify_error();
    }
}



