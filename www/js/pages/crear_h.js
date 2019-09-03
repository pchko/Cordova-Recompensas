function crear_h() {
    // Hide PDF on IOS
    if (!isAndroid)
        $('#pdf_container').hide();
    
    // Initialization
    var today = new Date();
    $('#dia').val(today.getDate());
    $('#mes').val(today.getMonth() + 1);
    $('#ano').val(today.getFullYear());

    // Validation
    $.validator.addMethod(
            "correct_date",
            function(value, element) {
                var fecha = $('#dia').val() + '/' + $('#mes').val() + '/' + $('#ano').val();
                return checkdate(fecha);
            },
            "La fecha debe tener el formato dd/mm/aaaa."
            );
    $("#crear_h").validate({
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
            },
            texto: "required"
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
            texto: "Por favor escriba una nota",
            dia: "Por favor escriba la fecha de su nota",
            mes: "Por favor escriba la fecha de su nota",
            ano: "Por favor escriba la fecha de su nota"
        },
        submitHandler: function(form) {
            show_overlay();
            $.jsonp({
                url: services_url + "his_c",
                callbackParameter: "callback",
                timeout: time_out,
                data: {data: $('#crear_h').serialize(), user: user_id()},
                success: function(data) {
                    if (data.d == '1')
                    {
                        function note_success()
                        {
                            if (pdfURI == '' && imageURI == '')
                            {
                                $('#crear_h')[0].reset();
                                $('#foto-historial').html('');
                                $('#pdf').html('Seleccionar archivo');
                                hide_overlay();
                                alerta('La nota se ha agregado al historial médico con éxito', 'historial.html');
                            }
                        }

                        // Sending image and/or pdf
                        if (imageURI != '' || pdfURI != '')
                        {
                            if (imageURI != '')
                            {
                                var options = new FileUploadOptions();
                                options.fileKey = "file";
                                options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                                options.mimeType = "image/jpeg";
                                var ft = new FileTransfer();
                                ft.upload(imageURI, services_url + "up_img_note?id=" + data.id, win, fail, options);
                                imageURI = '';
                            }

                            if (pdfURI != '')
                            {
                                var options_pdf = new FileUploadOptions();
                                options_pdf.fileKey = "file";
                                options_pdf.fileName = pdfURI.substr(pdfURI.lastIndexOf('/') + 1);
                                options_pdf.mimeType = "application/pdf";
                                var ft_pdf = new FileTransfer();
                                ft_pdf.upload(pdfURI, services_url + "up_pdf?id=" + data.id, win_pdf, fail_pdf, options_pdf);
                                pdfURI = '';
                            }
                        }
                        else
                            note_success();


                        function win(r) {
                            imageURI = '';
                            note_success();
                        }

                        function win_pdf(r) {
                            pdfURI = '';
                            note_success();
                        }

                        function fail(error) {
                            alerta("Ha ocurrido un error al subir la imagen");
                            imageURI = '';
                            note_success();
                        }

                        function fail_pdf(error) {
                            alerta("Ha ocurrido un error al subir el archivo pdf");
                            pdfURI = '';
                            note_success();
                        }
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

    $(document).on('click', '#camera', function() {
        var destinationType = navigator.camera.DestinationType;
        var quality = (isAndroid) ? (100) : (50); // bug for ios
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: quality, correctOrientation: true, targetWidth: 350, targetHeight: 350, destinationType: destinationType.FILE_URI});
        function onPhotoDataSuccess(url) {
            $('#foto-historial').attr('src', url);
            imageURI = url;
        }

        function onFail(message) {
            alerta('Ha ocurrido un error al capturar la imagen');
        }
    });
    $(document).on('click', '#libreria', function() {
        var pictureSource = navigator.camera.PictureSourceType;
        var destinationType = navigator.camera.DestinationType;
        var quality = (isAndroid) ? (100) : (50); // bug for ios
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: quality, correctOrientation: true, targetWidth: 350, targetHeight: 350, destinationType: destinationType.FILE_URI, sourceType: pictureSource.PHOTOLIBRARY});
        function onPhotoDataSuccess(url) {
            $('#foto-historial').attr('src', url);
            imageURI = url;
        }

        function onFail(message) {
            alerta('Ha ocurrido un error al seleccionar la imagen');
        }
    });

    $(document).on('click', '#pdf', function() {
        fileChooser.open(function(uri) {
            if (uri.indexOf('.pdf') !== -1)
            {
                var parts = uri.split('/');
                $('#pdf').html(parts[parts.length - 1]);
                pdfURI = uri;
            }
            else
            {
                alerta('Por favor, seleccione un archivo con extensión .pdf');
            }
        });
    });
}