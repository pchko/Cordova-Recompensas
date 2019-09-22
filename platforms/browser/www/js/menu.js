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
        //html += '<li><img src="img/banner.png" style="width:100%" /></li>';
        html+='<li>';
        html+='<div id="carruselBanners" class="carousel slide" data-ride="carousel">';
        html+='<ol id="indicadorBanners" class="carousel-indicators"></ol>';
        html+='<div id="carrusel2" class="carousel-inner"></div>';
        html+='<a class="left carousel-control" href="#carruselBanners" data-slide="prev">';
        html+='<span class="glyphicon glyphicon-chevron-left"></span>';
        html+='<span class="sr-only">Previous</span>';
        html+='</a>';
        html+='<a class="right carousel-control" href="#carruselBanners" data-slide="next">';
        html+='<span class="glyphicon glyphicon-chevron-right"></span>';
        html+='<span class="sr-only">Next</span>';
        html+='</a>';
        html+='</div>';
        html+='</li>';

        html += '<li><a href="home.html"><span><i class="fa fa-home" aria-hidden="true"></i> Home </span></a></li>';
        html += '<li><a href="echale.html"><img src="img/menu/registro.png" /><span> Échale los kilos y ponte la máscara</span></a></li>';
        html += '<li><a href="mision.html"><img src="img/menu/registro.png" /><span> La misión</span></a></li>';
        html += '<li><a href="bases.html"><img src="img/menu/registro.png" /><span> Bases del concurso</span></a></li>';
        html += '<li><a href="sku.html"><span><i class="fa fa-barcode" aria-hidden="true"></i> SKU\'s Participantes</span></a></li>';
        html += '<li><a href="gana.html"><span><i class="fa fa-plus-circle" aria-hidden="true"></i> Gana más</span></a></li>';
        html += '<li><a href="multimedia.html"><span><i class="fa fa-video" aria-hidden="true"></i> Videos</span></a></li>';
        html += '<li><a href="comentarios.html"><span><i class="fa fa-comments" aria-hidden="true"></i> Comentarios</span></a></li>';
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
