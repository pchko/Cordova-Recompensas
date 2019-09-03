function multimedia() {
    show_overlay();
    $.jsonp({
        url: services_url + "mul",
        callbackParameter: "callback", 
        timeout: time_out,
        data: {id: user_id()},
        success: function(data) {
            var multimedia = eval(data.d);
            var count = multimedia.length;
            var propios = '';
            var comunes = '';
            if (count > 0)
            {
                for (var i = 0; i < multimedia.length; i++)
                {
                    var div = '<div><a href="javascript:void(0);" onclick="openURL(\'' + assets_url + 'doc/' + multimedia[i].archivo +'\');">' + multimedia[i].archivo + '</a>';
                    if (multimedia[i].documento)
                        div += '<div>' + multimedia[i].documento + '</div>';
                    div += '</div><br />';

                    if (multimedia[i].usuario == user_id())
                        propios += div;
                    else
                        comunes += div;
                }

                if (propios != '')
                {
                    $('#propios').append('<h2>Materiales privados</h2>');
                    $('#propios').append(propios);
                }

                if (comunes != '')
                {
                    $('#comunes').append('<h2>Materiales públicos</h2>');
                    $('#comunes').append(comunes);
                }
                
                hide_overlay();
            }
            else
            {
                $('#comunes').html('<p>No existen materiales para mostrar</p>');  
                hide_overlay();
            }
        },
        error: function(xOptions, textStatus) {
            notify_offline();
        }
    });
}