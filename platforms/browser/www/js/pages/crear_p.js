function crear_p() {
        
    var today = new Date();
    $('#dia_i').val(today.getDate());
    $('#mes_i').val(today.getMonth() + 1);
    $('#ano_i').val(today.getFullYear());
    
    var timestamp = date_to_time(date_to_str(today));
    var end = new Date(timestamp + (3 * 24 * 60 * 60 * 1000)); // in 3 days
    $('#dia_f').val(end.getDate());
    $('#mes_f').val(end.getMonth() + 1);
    $('#ano_f').val(end.getFullYear());
    
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
    $("#crear_p").validate({
        rules: {
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
            dia_i: "Por favor escriba la fecha correctamente",
            mes_i: "Por favor escriba la fecha correctamente",
            ano_i: "Por favor escriba la fecha correctamente",
            dia_f: "Por favor escriba la fecha correctamente",
            mes_f: "Por favor escriba la fecha correctamente",
            ano_f: "Por favor escriba la fecha correctamente"            
        },
        submitHandler: function(form) {
        // Calculate timestamps
        var fi = checkdate($('#dia_i').val() + '/' + $('#mes_i').val() + '/' + $('#ano_i').val());
        var ff = checkdate($('#dia_f').val() + '/' + $('#mes_f').val() + '/' + $('#ano_f').val());
        if (fi && ff)
        {
            var time_i = date_to_time($('#dia_i').val() + '/' + $('#mes_i').val() + '/' + $('#ano_i').val());
            var time_f = date_to_time($('#dia_f').val() + '/' + $('#mes_f').val() + '/' + $('#ano_f').val());
            if (time_f > time_i)
            {
                var intervalo = 24 * 60 * 60 * 1000;
                var tiempos = [];
                var last_cal = get_calendario_index();
                var time_current = time_i;
                
                while (time_f >= time_current)
                {
                    tiempos.push(time_current);
                    time_current += intervalo;
                }
                
                for(var i=0; i<tiempos.length; i++)
                {
                    // Inserting events
                    var evento = {id: last_cal, ti: "Período Menstrual", t: "p", d: tiempos[i].toString()};
                    add_calendario(evento);

                    last_cal++;
                }
                
                // Creating events for fertility
                var fert = time_i + 12 * 24 * 60 * 60 * 1000;
                intervalo = 24 * 60 * 60 * 1000;
                
                for(var i=1; i<=4; i++)
                {
                    var evento = {id: last_cal, ti: "Período Fértil", t: "f", d: fert.toString()};
                    add_calendario(evento);

                    fert += intervalo;
                    last_cal++;
                }
                
                $('#crear_p')[0].reset();
                alerta('El período ha sido guardado con éxito', 'calendario.html');
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
}