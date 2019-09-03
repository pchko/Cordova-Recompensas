function crear_c() {
    // Initialization
    var today = new Date();
    $('#dia').val(today.getDate());
    $('#mes').val(today.getMonth() + 1);
    $('#ano').val(today.getFullYear());
    
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
            dia: "Por favor escriba la fecha correctamente",
            mes: "Por favor escriba la fecha correctamente",
            ano: "Por favor escriba la fecha correctamente"
        },
        submitHandler: function(form) {
            // Calculate timestamps
            var f = checkdate($('#dia').val() + '/' + $('#mes').val() + '/' + $('#ano').val());
            if (f)
            {
                var time = date_to_time($('#dia').val() + '/' + $('#mes').val() + '/' + $('#ano').val());
                var coito = {id: get_calendario_index(), ti: "Coito programado", t: "c", d: time.toString()};
                add_calendario(coito);
                $('#crear_c')[0].reset();
                alerta('La fecha de coito ha sido guardada con éxito', 'calendario.html');
            }
            else
            {
                alerta('Fecha incorrecta');
            }
        }
    });
}