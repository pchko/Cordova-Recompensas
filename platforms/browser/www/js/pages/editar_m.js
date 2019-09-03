function editar_m() {
    $('.spin_input').TouchSpin({});
    var id = parseInt($_GET('id'));
    if (typeof id !== 'undefined')
    {
        var id_med = get_id_medicamento_by_evento_id(id);
        var medicamento = get_medicamento(id_med);
        
        $('#medicamento').val(medicamento.titulo);
        $('#dosis').val(medicamento.dosis);
        $('#hora_i').val(medicamento.hora_i);
        var fecha_inicio = checkdate(medicamento.fecha_i, true);
        $('#dia_i').val(fecha_inicio.day);
        $('#mes_i').val(fecha_inicio.month);
        $('#ano_i').val(fecha_inicio.year);
        $('#hora_f').val(medicamento.hora_f);
        var fecha_fin = checkdate(medicamento.fecha_f, true);
        $('#dia_f').val(fecha_fin.day);
        $('#mes_f').val(fecha_fin.month);
        $('#ano_f').val(fecha_fin.year);
        $('#' + medicamento.mi + 'i').attr('checked', 'checked');
        $('#' + medicamento.mf + 'f').attr('checked', 'checked');
        $('#frecuencia').val(medicamento.frecuencia);
    }
    else
        alerta('Ha ocurrido un error con este medicamento', 'calendario.html');
    

    // Validation
    $.validator.addMethod(
            "correct_date_i",
            function(value, element) {
                var fecha = $('#dia_i').val() + '/' + $('#mes_i').val() + '/' + $('#ano_i').val();
                return checkdate(fecha);
            },
            "La fecha debe tener el formato dd/mm/aaaa."
    );
    $.validator.addMethod(
            "correct_date_f",
            function(value, element) {
                var fecha = $('#dia_f').val() + '/' + $('#mes_f').val() + '/' + $('#ano_f').val();
                return checkdate(fecha);
            },
            "La fecha debe tener el formato dd/mm/aaaa."
    ); 
    $("#editar_m").validate({
        rules: {
            titulo: "required",
            dosis: "required",
            dia_i: { 
                required: true,
                correct_date_i: true
            },
            mes_i: { 
                required: true,
                correct_date_i: true
            },
            ano_i: { 
                required: true,
                correct_date_i: true
            },
            dia_f: { 
                required: true,
                correct_date_f: true
            },
            mes_f: { 
                required: true,
                correct_date_f: true
            },
            ano_f: { 
                required: true,
                correct_date_f: true
            }
        },
        groups: {
            fecha_i: "dia_i mes_i ano_i",
            fecha_f: "dia_f mes_f ano_f"
        },
        errorPlacement: function(error, element) {
            if (element.attr("name") == "dia_i" || element.attr("name") == "mes_i" || element.attr("name") == "ano_i") 
                error.insertAfter("#date_message_i");
            else 
                error.insertAfter(element);
            
            if (element.attr("name") == "dia_f" || element.attr("name") == "mes_f" || element.attr("name") == "ano_f") 
                error.insertAfter("#date_message_f");
            else 
                error.insertAfter(element);            
        },          
        messages: {
            titulo: "Por favor escriba el nombre del medicamento",
            dosis: "Por favor escriba la dosis del medicamento",
            dia_i: "Por favor escriba la fecha de inicio correctamente",
            mes_i: "Por favor escriba la fecha de inicio correctamente",
            ano_i: "Por favor escriba la fecha de inicio correctamente",
            dia_f: "Por favor escriba la fecha de fin correctamente",
            mes_f: "Por favor escriba la fecha de fin fecha correctamente",
            ano_f: "Por favor escriba la fecha de fin fecha correctamente"  
        },
        submitHandler: function(form) {
            // Calculate timestamps
            var fi = checkdate($('#dia_i').val() + '/' + $('#mes_i').val() + '/' + $('#ano_i').val());
            var ff = checkdate($('#dia_f').val() + '/' + $('#mes_f').val() + '/' + $('#ano_f').val());
            var hi = parseInt($('#hora_i').val());
            var hf = parseInt($('#hora_f').val());
            var mi = $("input:radio[name ='meridiano_i']:checked").val();
            var mf = $("input:radio[name ='meridiano_f']:checked").val();
            if (fi && ff)
            {
                var time_i = datehour_to_time($('#dia_i').val() + '/' + $('#mes_i').val() + '/' + $('#ano_i').val(), convert_12_24(hi, mi));
                var time_f = datehour_to_time($('#dia_f').val() + '/' + $('#mes_f').val() + '/' + $('#ano_f').val(), convert_12_24(hf, mf));
                if (time_f > time_i)
                {
                    var frecuencia = parseInt($('.frecuencia input').val());
                    var intervalo = frecuencia * 60 * 60 * 1000;
                    var tiempos = [];
                    var i = 0;
                    while (time_f >= time_i)
                    {
                        tiempos.push(time_i);
                        var futuro = time_to_date_es(time_i);
                        $('#tiempos .data').append('<p data-time="' + time_i + '">' + futuro + '</p>');
                        time_i += intervalo;
                        i++;
                    }
                    if (i == 0)
                        $('#tiempos .data').append('<p>El intervalo de fechas y la frecuencia seleccionada no proporcionan ningún horario válido</p>');
                    else if (i > 25)
                        alerta('Se han calculado ' + i + ' horarios del medicamento. Por favor, asegúrese de haber seleccionado los parámtros de forma correcta.');
                    $('#form_edit_medicamento').hide();
                    $('#tiempos').show();
                    myScroll.scrollTo(0, 0);
                }
                else
                {
                    alerta('La fecha de fin debe ser mayor que la de inicio');
                }
            }
            else
            {
                alerta('Fecha incorrecta');
            }
        }
    });
    $(document).on('click', '#volver_accion', function() {
        $('#form_edit_medicamento').show();
        $('#tiempos').hide();
        $('#tiempos .data').html('');
        myScroll.scrollTo(0, 0);
    });
    $(document).on('click', '#programar_accion', function() {
        var tiempos = [];
        
        // Delete previous data
        var previous = get_events_by_medicamento(medicamento.id_medicamento);
        delete_calendario(previous);
        
        for (var i=0; i < previous.length; i++)
        {
			window.plugin.notification.local.cancel('m_' + previous[i], function() {

			});
        }
        
        var previous_med = [];
        previous_med.push(medicamento.id_medicamento);
        delete_medicamento(previous_med);
        
        var last_cal = get_calendario_index();
        var last_med = get_medicamentos_index();
        
        // Updating med
        var med = {id_medicamento: last_med, 
                    titulo: $('#medicamento').val(), dosis: $('#dosis').val(), 
                    hora_i: $('#hora_i').val(), fecha_i: $('#dia_i').val() + '/' + $('#mes_i').val() + '/' + $('#ano_i').val(),
                    hora_f: $('#hora_f').val(), fecha_f: $('#dia_f').val() + '/' + $('#mes_f').val() + '/' + $('#ano_f').val(),
                    mi: $("input:radio[name ='meridiano_i']:checked").val(), 
                    mf: $("input:radio[name ='meridiano_f']:checked").val(),
                    frecuencia: $('.frecuencia input').val()
                  };
        add_medicamento(med);
        
        $('#tiempos .data p').each(function() {
            tiempos.push(parseInt($(this).attr('data-time')));
        });
        
        for(var i=0; i<tiempos.length; i++)
        {
            // Inserting events
            var evento = {id: last_cal, ti: $('#medicamento').val(), t: "m", d: tiempos[i].toString(), med: last_med};
            add_calendario(evento);
            
            // Device Alarm
            var event_date = time_to_date(tiempos[i] - 30 * 60 * 1000);
			window.plugin.notification.local.add({
				id: 'm_' + last_cal,
				title: 'RedCrea - Recordatorio de Medicamento',
				message: $('#medicamento').val(),
				sound: 'TYPE_ALARM',
				// www/audio/beep.mp3
				//sound: assets_url + 'sound/notification.mp3',
				date: event_date,
				json: JSON.stringify({ type: "calendario", id: last_cal })
			});
            
            last_cal++;
        }
        
        $('#editar_m')[0].reset();
        alerta('El medicamento ha sido programado con éxito', 'calendario.html');
      
    });
    
    $(document).on('click', '#eliminar_m', function() {
        show_right_panel();
        $('#right_panel .panel_in').html('<p>Está a punto de eliminar un medicamento programado de forma permanente.<br /> ¿Está seguro de proceder?</p><br /><br /><a href="javascript:void(0);" class="btn warning yes">Eliminar medicamento</a><a href="javascript:void(0);" class="btn no">Cancelar</a>');
    });
    
    $(document).on('click', '#right_panel .panel_in .yes', function() {
        var previous = get_events_by_medicamento(medicamento.id_medicamento);
        delete_calendario(previous);
        
        for (var i=0; i < previous.length; i++)
        {
			window.plugin.notification.local.cancel('m_' + previous[i], function() {

			});
        }
        
        var previous_med = [];
        previous_med.push(medicamento.id_medicamento);
        delete_medicamento(previous_med);
        
        alerta('El medicamento ha sido eliminado con éxito', 'calendario.html');
    });
    
    $(document).on('click', '#right_panel .panel_in .no', function() {
        hide_right_panel();
    });
}