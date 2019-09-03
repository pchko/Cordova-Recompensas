function contacto_cuernavaca() {
    if (!is_online)
        notify_offline();
    else
    {
        // Google map
        $('#map').html('<div id="map-container" style="width: 100%; height: 300px;"></div><br /><br />');
        var myLocation = new google.maps.LatLng(18.906716, -99.221022);
        map = new google.maps.Map(document.getElementById('map-container'), {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: myLocation,
            zoom: 16
        });
        var current_marker = new google.maps.Marker({
            map: map,
            position: myLocation
        });
        var infowindow = new google.maps.InfoWindow({
            content: '<div style="width: 135px;">Red Crea Cuernavaca</div>'
        });
        infowindow.open(map, current_marker);
    }

    // Form validate
    $("#cue_con_data").validate({
        rules: {
            nombre: "required",
            email: {
                required: true,
                email: true
            },
            mensaje: "required"
        },
        messages: {
            nombre: "Por favor escriba su nombre completo",
            email: "Por favor escriba su E-mail",
            mensaje: "Por favor escriba el mensaje"
        },
        submitHandler: function(form) {
            show_overlay();
            $.jsonp({
                url: services_url + "con_c",
                callbackParameter: "callback", timeout: time_out,
                data: {data: $('#cue_con_data').serialize()},
                success: function(data) {
                    if (data.d == '1')
                    {
                        $('#cue_con_data')[0].reset();
                        hide_overlay();
                        alerta('Gracias por contactar con Redcrea Sucursal Cuernavaca');
                    }
                    else
                    {
                        notify_error();
                    }
                },
                error: function(xOptions, textStatus) {
                    notify_offline();
                }
            });
        }
    });
}