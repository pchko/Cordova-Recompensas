function calendario() {
    // Eliminar evento (coito - periodo)
    $(document).on('click', '.delete', function() {
        show_right_panel();
        $('#right_panel .panel_in').html('<p>Está a punto de eliminar un evento programado de forma permanente.<br /> ¿Está seguro de proceder?</p><br /><br /><a href="javascript:void(0);" data-date="' + $(this).attr('data-date') + '" class="btn warning yes">Eliminar evento</a><a href="javascript:void(0);" class="btn no">Cancelar</a>');
    });
    
    $(document).on('click', '#right_panel .panel_in .yes', function() {
        var ids = [];
        ids.push(parseInt($(this).attr('data-date')));
        
        delete_calendario(ids);
        hide_right_panel();
        alerta('El evento ha sido eliminado con éxito', 'calendario.html');
    });
    
    $(document).on('click', '#right_panel .panel_in .no', function() {
        hide_right_panel();
    });
    
    $("#calendar").eventCalendar({
        jsonData: get_calendario(),
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        txt_noEvents: "No hay eventos para este día",
        txt_SpecificEvents_prev: "",
        txt_SpecificEvents_after: "",
        txt_next: "siguiente",
        txt_prev: "anterior",
        txt_NextEvents: "Próximos eventos:",
        txt_GoToEventUrl: "Ir al evento"
    });
        
}