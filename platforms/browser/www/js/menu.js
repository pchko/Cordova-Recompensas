$(document).on("ready",function(){
    
    var content_height, rightScroll;
    var css_transform = (androidVersion >= 4 || !isAndroid);
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1;
    var androidVersion = parseFloat(ua.slice(ua.indexOf("android") + 8));
    var anuncio = $(".alert");
    anuncio.hide();

    width = $(window).width();
    height = $(window).height();
    content_height = height - 45;

    var html = '<ul>';
        html += '<li><img src="img/banner.png" style="width:100%" /></li>';
        html += '<li><a href="home.html"><img src="img/menu/noticias.png" /><span>Home</span></a></li>';
        //html += '<li><a href="acumulacion.html"><img src="img/menu/registro.png" /><span>Acumular puntos</span></a></li>';
        //html += '<li><a href="redencion.html"><img src="img/menu/registro.png" /><span>Redimir productos</span></a></li>';
        html += '<li><a href="multimedia.html"><img src="img/menu/multimedia.png" /><span>Multimedia</span></a></li>';
        html += '<li><a href="comentarios.html"><img src="img/menu/testimonios.png" /><span>Comentarios</span></a></li>';
        html += '<li><a id="close_sesion" href="javascript:;"><img src="img/menu/entrar.png" /><span>Cerrar Sesión</span></a></li>';
        html += '<li><a id="cerrar_app" href="javascript:;"><img src="img/menu/close.png" /><span>Salir</span></a></li>';
    html += '</ul>';

    $('#menu').html(html);

    function toogle_menu(){
        if (is_menu_visible())
            hide_menu();
        else
            show_menu();
    }

    function hide_right_panel(){
        $('#right_panel').animate({right: "-100%"}, 500, function() {
            $('#right_panel').height(0);
        });
    }

    function show_right_panel(){
        $('#right_panel').height(content_height).show();
        $('#right_panel .panel_in').width(width - 40).height(content_height - 30);
        rightScroll = new iScroll('right_panel', {checkDOMChanges: true, useTransform: css_transform});
        $('#right_panel').animate({right: 0}, 500);
    }

    function show_menu(){
        if ($('#menu').height() === 0)
            $('#menu').height(content_height);
        $('#menu').animate({left: 0}, 500);
        if (typeof rightScroll !== 'undefined')
        {
            hide_right_panel();
        }
    }

    function hide_menu(){
        $('#menu').animate({left: "-105%"}, 500);
        if (typeof menuScroll !== 'undefined')
            menuScroll.scrollTo(0, 0);
    }

    $('#menu_action').on('click', function() {
        toogle_menu();
    });

    function is_menu_visible(){
        var current_left = $('#menu').css('left');        
        return (current_left == "0px");
    }

    $("#close_sesion").on('click',function(){        
        window.localStorage.clear();
        window.location="index.html";
    });

    $("#cerrar_app").on("click",function(){       
       $(".alert").show();
    });

    $('#close_alert').on('click', function() {
        $('div.alert').hide();
    });

    $('#close_app').on('click', function() {
        navigator.app.exitApp();
    });


});