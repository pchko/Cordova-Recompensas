function agenda() {
    $(document).on('click', 'a.new-alarm', function() {
        show_overlay();
        var id = $(this).attr('data-rel');
        $.jsonp({
            url: services_url + "age_a",
            callbackParameter: "callback", 
            timeout: time_out,
            data: {id: id},
            success: function(data) {
                if (data.d == '1')
                {
                    // Device Alarm
                    var time = datehour_to_time($('#date' + id).attr('data-date'), $('#date' + id).attr('data-time'));
                    var event_date = time_to_date(time - 30 * 60 * 1000);
					window.plugin.notification.local.add({
						id: 'c_' + id,
						title: 'RedCrea - Recordatorio de Cita',
						message: $('#date' + id).html() + ' - ' + $('#doc' + id).html(),
						sound: 'TYPE_ALARM',
						// www/audio/beep.mp3
						//sound: assets_url + 'sound/notification.mp3',
						date: event_date,
						json: JSON.stringify({ type: "agenda", id: id })
					});
                    hide_overlay();
                    $('#alarm' + id).html('Alarma programada');
                    alerta('Se emitirá una notificación 30 minutos antes del ' + $('#date' + id).html());
                }
                else
                    notify_error();
            },
            error: function(xOptions, textStatus) {
                notify_offline();
            }
        });
    });
    
    show_overlay();
    $.jsonp({
        url: services_url + "age",
        callbackParameter: "callback", 
        timeout: time_out,
        data: {id: user_id()},
        success: function(data) {
            var citas = eval(data.d);
            if (citas.length > 0)
            {
                for (var i = 0; i < citas.length; i++)
                {
                    var estado = '';
                    switch (citas[i].estado) {
                        case '0':
                            estado = '(Pendiente de aprobación)';
                            break;
                        case '1':
                            var alarma = (citas[i].alarma == '0') ? ('<br /><span id="alarm' + citas[i].id_cita + '"><a class="new-alarm" data-rel="' + citas[i].id_cita + '">Programar Alarma</a></span>') : ('<br />Alarma programada');
                            estado = '(Aprobada)' + alarma;
                            break;
                        case '2':
                            estado = '(Efectuada)';
                            break;
                    }
                    $('#citas').append('<div class="cita"><div class="cita_data"><span id="date' + citas[i].id_cita + '" data-date="' + mysql_to_js(citas[i].fecha) + '" data-time="' + convert_12_24(citas[i].hora, citas[i].meridiano) + '">Día ' + mysql_to_js(citas[i].fecha) + ' a las ' + citas[i].hora + ':00 ' + citas[i].meridiano + '</span><br /><span id="doc' + citas[i].id_cita + '">Doctor(a): ' + citas[i].nombre + '</span></div><div class="cita_estado">' + estado + '</div></div><br class="clear" /><br />');
                }
                
                hide_overlay();
            }
            else
            {
                $('#citas').append('<p>No tiene citas programadas</p>');
                hide_overlay();
            }
        },
        error: function(xOptions, textStatus) {
            notify_offline();
        }
    });
}