function historial() {
    show_overlay();
    $.jsonp({
        url: services_url + "his",
        callbackParameter: "callback", timeout: time_out,
        data: {id: user_id()},
        success: function(data) {
            var notas = eval(data.d);
            var count = notas.length;
            if (count > 0)
            {
                for (var i = 0; i < notas.length; i++)
                {
                    var imagen = (notas[i].foto !== null)?('<p><img src="' + assets_url + 'his/' + notas[i].foto + '" /></p>'):('');
                    var pdf = (notas[i].pdf !== null)?('<p><a href="javascript:void(0);" onclick="openURL(\'' + assets_url + 'his/' + notas[i].pdf + '\');">' + notas[i].pdf + '</a></p>'):('');
                    var div = '<div><h3>' + mysql_to_js(notas[i].fecha) + '</h3>' + imagen + pdf + '<p>' + notas[i].texto + '</p></div><br />';
                    $('#historial').append(div);
                }
                hide_overlay();
            }
            else
            {
                $('#historial').html('<p>No existen notas para mostrar</p>');  
                hide_overlay();
            }
        },
        error: function(xOptions, textStatus) {
            notify_offline();
        }
    });
}