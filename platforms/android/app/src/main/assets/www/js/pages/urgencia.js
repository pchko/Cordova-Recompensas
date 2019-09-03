function urgencia() {
    $("#sms_form").validate({
        rules: {
            mensaje: {
                required: true
            }
        },
        messages: {
            mensaje: "Por favor escriba un mensaje para enviar"
        },
        submitHandler: function(form) {
            show_overlay();
            $.jsonp({
                url: services_url + "sms",
                callbackParameter: "callback", timeout: time_out,
                data: {men: $('#mensaje').val(), user: user_id()},
                success: function(data) {
                    if (data.d == '1')
                    {
                        // Reset form
                        $('#sms_form')[0].reset();
                        hide_overlay();
                        alerta('El mensaje fue enviado con éxito');
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
}