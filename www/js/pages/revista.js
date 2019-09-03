function revista() {
    
    show_overlay();
  
    $.jsonp({
        url: services_url + "rev",
        callbackParameter: "callback", timeout: time_out,
        success: function(data) {
            var revistas = eval(data.d);
            var count = revistas.length;
            if (count > 0)
            {
                for (var i = 0; i < revistas.length; i++)
                {
                    var cla = (i % 2 == 0)?('clear'):('last');
                    var div = '<div class="ver w50 ' + cla + '"><h2>' + revistas[i].titulo + '</h2><a href="revista_gal.html?id=' + revistas[i].id_revista + '"><img src="' + assets_url + 'rev/' + revistas[i].imagen + '" /><span></span><p>Ver revista</p></a><br /></div>';
                    $('.content').append(div);
                    hide_overlay();
                }
            }
            else
            {
                $('.content').html('<p>No existen publicaciones para mostrar</p>');
                hide_overlay();
            }
        },
        error: function(xOptions, textStatus) {
            alerta("error: la url no carga");
            notify_offline();
        }
    });
}