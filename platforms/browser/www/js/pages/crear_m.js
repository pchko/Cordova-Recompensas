function crear_m() {
    // Initialization
    var today = new Date();
    $('#dia_i').val(today.getDate());
    $('#mes_i').val(today.getMonth() + 1);
    $('#ano_i').val(today.getFullYear());
    
    var timestamp = date_to_time(date_to_str(today));
    var end = new Date(timestamp + (3 * 24 * 60 * 60 * 1000)); // in 3 days
    $('#dia_f').val(end.getDate());
    $('#mes_f').val(end.getMonth() + 1);
    $('#ano_f').val(end.getFullYear());
    
    var hour = today.getHours() + 1;
    if (hour == 24)
        hour = 0;
    var now = convert_24_12(hour);
    $('#hora_i').val(now.hour);
    $('#hora_f').val(now.hour);
    $('#' + now.mer + 'i').attr('checked', 'checked');
    $('#' + now.mer + 'f').attr('checked', 'checked');
    $('.spin_input').TouchSpin({});
    
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
    $("#crear_m").validate({
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
                    $('#form_new_medicamento').hide();
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
        $('#form_new_medicamento').show();
        $('#tiempos').hide();
        $('#tiempos .data').html('');
        myScroll.scrollTo(0, 0);
    });
    
    $(document).on('click', '#programar_accion', function() {
        var tiempos = [];
        var last_cal = get_calendario_index();
        var last_med = get_medicamentos_index();
        
        // Inserting med
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
        
        $('#crear_m')[0].reset();
        alerta('El medicamento ha sido programado con éxito', 'calendario.html');
    });
}
