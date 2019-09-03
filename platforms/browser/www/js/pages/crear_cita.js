function crear_cita() {
    
    var today = new Date();
    var timestamp = date_to_time(date_to_str(today));
    var tomorrow = new Date(timestamp + (24 * 60 * 60 * 1000)); // tomorrow
    $('#dia').val(tomorrow.getDate());
    $('#mes').val(tomorrow.getMonth() + 1);
    $('#ano').val(tomorrow.getFullYear());
    
    // Form validate
    $.validator.addMethod(
            "correct_date",
            function(value, element) {
                var fecha = $('#dia').val() + '/' + $('#mes').val() + '/' + $('#ano').val();
                return checkdate(fecha);
            },
            "La fecha debe tener el formato dd/mm/aaaa."
    );
    $("#crear_c").validate({
        rules: {
            dia: { 
                required: true,
                correct_date: true
            },
            mes: { 
                required: true,
                correct_date: true
            },
            ano: { 
                required: true,
                correct_date: true
            }
        },
        groups: {
            fecha: "dia mes ano"
        },
        errorPlacement: function(error, element) {
            if (element.attr("name") == "dia" || element.attr("name") == "mes" || element.attr("name") == "ano") 
                error.insertAfter("#date_message");
            else 
                error.insertAfter(element);
        },        
        messages: {
            dia: "Por favor escriba la fecha de su cita",
            mes: "Por favor escriba su fecha de su cita",
            ano: "Por favor escriba su fecha de su cita"
        },
        submitHandler: function(form) {
            show_overlay();
            $.jsonp({
                url: services_url + "age_c",
                callbackParameter: "callback", timeout: time_out,
                data: {data: $('#crear_c').serialize(), id: user_id()},
                success: function(data) {
                    if (data.d == '1')
                    {
                        hide_overlay();
                        alerta('Su cita ha sido agendada con éxito y en breve nos comunicaremos con usted para confirmarla.', 'agenda.html');
                    }
                    else
                        notify_error();
                },
                error: function(xOptions, textStatus) {
                    notify_offline();
                }
            });
        }
    });
    
    show_overlay();
    $('.spin_input').TouchSpin({
        initval: 7.00,
        step: 0.20,
        decimals: 2,
        booster: false
    });
    
    $('.spin_input').on("touchspin.on.stopspin", function() {
        var current = $(this).val();
        var entero = current.toString().split('.')[0];
        if (entero == 0 || entero > 12)
        {
            $(this).val('12.00');
            $('#meridiano').html('PM');
        }
        
        // PM
        if ((entero >= 1 && entero <= 5) || entero == 12)
        {
            $('#meridiano').html('PM');
        }
        
        // AM
        if (entero >= 7 && entero <= 11)
        {
            $('#meridiano').html('AM');
        }        
        
    });
    $('.spin_input').on("touchspin.on.startupspin", function() {
        var current = $(this).val();
        var entero = current.toString().split('.')[0];
        var decimal = current.toString().split('.')[1]; 
        
        if (entero != 5)
        {
            if (decimal >= 60)
            {
                entero++;
                decimal = '00';
            }

            if (entero == 13)
            {
                entero = 1;
            }  

            $(this).val(entero + '.' + decimal); 
        }
        else
            $(this).val('5.00');
    });
    $('.spin_input').on("touchspin.on.startdownspin", function() {
        var current = $(this).val();
        var entero = current.toString().split('.')[0];
        var decimal = current.toString().split('.')[1];     
        
        if (entero != 6)
        {
            if (decimal >= 60)
            {
                decimal = '40';
            }
            
            if (entero == 0)
            {
                entero = 12;
            } 

            $(this).val(entero + '.' + decimal);                
        }
        else
            $(this).val('7.00');
    });    
    $.jsonp({
        url: services_url + "doc",
        callbackParameter: "callback", timeout: time_out,
        success: function(data) {
            var doctors = eval(data.d);
            for (var i = 0; i < doctors.length; i++)
            {
                $('#doctor').append('<option value="' + doctors[i].id_doctor + '">' + doctors[i].nombre + '</option>');
            }
            
            hide_overlay();
        },
        error: function(xOptions, textStatus) {
            notify_offline();
        }
    });
}
