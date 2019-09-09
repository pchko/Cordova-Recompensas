
var apiKey = "PXLALA";

var is_online = false;
var is_iPad = navigator.userAgent.match(/iPad/i) != null;
var myScroll, menuScroll, rightScroll;
var width = $(window).width();
var height = $(window).height();
var content_height;
var imageURI = '';
var pdfURI = '';
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1;
var androidVersion = parseFloat(ua.slice(ua.indexOf("android") + 8));
var css_transform = (androidVersion >= 4 || !isAndroid);
var openURL = function(url) {
    if (isAndroid)
        navigator.app.loadUrl(url, {openExternal: true});
    else
        window.open(url, '_system');
};
var time_out = 10000;

function alerta(mensaje, redirect) {
    var redirect_html = (typeof redirect != 'undefined') ? (redirect_html = 'href="' + redirect + '"') : ('id="close_alert" href="javascript:void(0);"');

    var div = '<div class="alert"> <div class="top"></div> <div class="main"></div> <div class="container">' + mensaje + '<div class="action"> <a ' + redirect_html + ' class="ok">OK</a></div></div>';
    $('body').append(div);
}

function confirma_salida() {
    var div = '<div class="alert"> <div class="top"></div> <div class="main"></div> <div class="container">¿Desea cerrar la aplicación wiinikil?<div class="action"> <a id="close_app" href="javascript:void(0);" class="ok">Salir</a>&nbsp;<a id="close_alert" href="javascript:void(0);" class="ok">Cancelar</a></div></div>';
    $('body').append(div);

}

var last_click_time = new Date().getTime();
document.addEventListener('click', function(e) {
    if (isAndroid)
    {
        if (!$(e.target).hasClass('rad-label'))
        {
            var click_time = e['timeStamp'];
            if (click_time && (click_time - last_click_time) < 1000) {
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
            last_click_time = click_time;
        }
    }

}, true);

$(document).on('click', '#close_alert', function() {
    $('div.alert').remove();
});

$(document).on('keydown', '.ui-element.date input', function(e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }

    var length = ($(this).attr('id') == 'ano') ? (4) : (2);
    if ($(this).val().length == length)
    {
        e.preventDefault();
        $(this).next().focus();
    }

});

function show_overlay() {
    $('body').append('<div id="overlay"><div id="top"></div><div id="main"></div></div></div>');
}

function hide_overlay() {
    $('#overlay').remove();
}

function notify_offline() {
    hide_overlay();
    if ($('#offline').length == 0)
    {
        $('.content').prepend('<div id="offline"><p>Esta función requiere que su dispositivo esté conectado a Internet para su funcionamiento. Por favor, conecte su teléfono y vuelva a intentarlo.</p><a class="btn" id="reload">Recargar</a></div>');
        if (typeof myScroll !== 'undefined')
            myScroll.scrollTo(0, 0);
    }
}

function notify_offline2() {
    hide_overlay();
    if ($('#offline').length == 0)
    {
        $('.content').prepend('<div id="offline"><p>Almacenado en memoria interna- Por favor, conecte su teléfono cuando la señal sea optima y envie su registro.</p><a class="btn" id="reload">Nuevo</a></div>');
        if (typeof myScroll !== 'undefined')
            myScroll.scrollTo(0, 0);
    }
}

function hide_offline() {
    $('#offline').remove();
}

function notify_error() {
    hide_overlay();
    alerta('Ha ocurrido un error en la conexción');
    if (typeof myScroll !== 'undefined')
        myScroll.scrollTo(0, 0);
}




function is_login()
{
    return (window.localStorage.getItem("user_id") != null && window.localStorage.getItem("user_id") != 'undefined');
}

function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}

function number_phone() {
    
    alert("valido numeor");
    
    if ((window.localStorage.getItem("number_tphone") != null && window.localStorage.getItem("number_tphone") != 'undefined')) {
        alert("dos"+ num);
         return window.localStorage.getItem("number_tphone");
       
       
    }else{
        
         var num = (window.localStorage.getItem("number_tphone"));
        alert("uno"+ num);
        window.location = 'phone.html';
        
    }
    
}




function user_id()
{
    return window.localStorage.getItem("user_id");
}

function $_GET(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return unescape(pair[1]);
        }
    }
    return false;
}

 function isset ( strVariableName ) {

    alerta("entro isset");
    try {
        eval( strVariableName );
    } catch( err ) {
        if ( err instanceof ReferenceError )
           return false;
    }

    return true;

 }

 function parseQuery(qstr)
 {
    
    
   var query = {};
   var a = qstr.split('&');
   for (var i = 0; i < a.length; i++)
   {
     var b = a[i].split('=');
     query[decodeURIComponent(b[0])] = decodeURIComponent(b[1]);
   }

   return query;
 }



function checkdate(input, return_date) {
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(input))
    {
        return false;
    }

    var parts = input.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    if (year < 1000 || year > 3000 || month == 0 || month > 12)
    {
        return false;
    }

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    if (day > 0 && day <= monthLength[month - 1])
    {
        return (typeof return_date !== 'undefined') ? ({day: day, month: month, year: year}) : (true);
    }

    return false;
}

function date_to_str(date)
{
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
}

function date_to_time(d)
{
    var date = checkdate(d, true);

    return new Date(date.year, date.month - 1, date.day).getTime();
}

function datehour_to_time(d, hour_24)
{
    var date = checkdate(d, true);

    return new Date(date.year, date.month - 1, date.day, hour_24).getTime();
}

function time_to_date(timestamp) {
    return new Date(parseInt(timestamp));
}

function time_to_date_es(timestamp) {
    var a = new Date(timestamp);
    var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var mer;
    if (hour < 10) {
        hour = '0' + hour;
    }
    var min = a.getMinutes();
    if (min < 10) {
        min = '0' + min;
    }
    if (hour == 0)
    {
        hour = 12;
        mer = 'am';
    }
    else if (hour > 12)
    {
        hour -= 12;
        mer = 'pm';
    }
    else if (hour == 12)
        mer = 'pm';
    else
        mer = 'am';
    var time = date + ' de ' + month + ' de ' + year + ' a las ' + hour + ':' + min + ' ' + mer;
    return time;
}

function mysql_to_js(iso)
{
    var dateParts = iso.split("-");
    return dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0];
}

function convert_12_24(h, mer)
{
    var hour = parseInt(h);

    if (hour == 12 && mer == 'am')
        return 0;
    if (mer == 'pm' && hour < 12)
        return hour + 12;

    return hour;
}

function convert_24_12(hour)
{
    var mer = 'am';

    if (hour == 12)
        mer = 'pm';
    if (hour == 0)
    {
        hour = 12;
    }
    if (hour > 12)
    {
        hour -= 12;
        mer = 'pm';
    }


    return {hour: hour, mer: mer};
}

function get_medicamentos() {
    return eval(window.localStorage.getItem('medicamentos'));
}

function get_medicamento(id) {
    var medicamentos = get_medicamentos();
    var data = eval(medicamentos);

    for (var i = 0; i < data.length; i++)
    {
        if (data[i].id_medicamento == id)
            return data[i];
    }

    return false;
}

function get_id_medicamento_by_evento_id(id) {
    var eventos = get_calendario();
    var data = eval(eventos);

    for (var i = 0; i < data.length; i++)
    {
        if (data[i].hasOwnProperty('med') && data[i].id == id)
            return data[i].med;
    }

    return false;
}

function get_medicamentos_index() {
    if (window.localStorage.getItem('medicamentos') == null)
    {
        window.localStorage.setItem('medicamentos', JSON.stringify([]));
        window.localStorage.setItem('index_medicamento', 0);
    }

    return parseInt(window.localStorage.getItem('index_medicamento'));
}

function add_medicamento(entry) {
    var med = get_medicamentos();
    var data = eval(med);
    if (!$.isArray(data))
        data = [];

    data.push(entry);
    window.localStorage.setItem('medicamentos', JSON.stringify(data));
    window.localStorage.setItem('index_medicamento', get_medicamentos_index() + 1);
}

function delete_medicamento(array_id)
{
    var data_return = [];

    if (array_id != 'all')
    {
        var med = get_medicamentos();
        var data = eval(med);

        for (var i = 0; i < data.length; i++)
        {
            if (array_id.indexOf(data[i].id_medicamento) == -1)
                data_return.push(data[i]);
        }
    }
    else
        window.localStorage.setItem('index_medicamento', 0);

    window.localStorage.setItem('medicamentos', JSON.stringify(data_return));
}

function get_calendario() {
    if (window.localStorage.getItem('calendario') == null)
    {
        window.localStorage.setItem('calendario', JSON.stringify([]));
        window.localStorage.setItem('index_calendario', 0);
    }

    return eval(window.localStorage.getItem('calendario'));
}

function get_calendario_index() {
    return parseInt(window.localStorage.getItem('index_calendario'));
}

function add_calendario(entry) {
    var calendar = get_calendario();
    var data = eval(calendar);
    if (!$.isArray(data))
        data = [];

    data.push(entry);
    window.localStorage.setItem('calendario', JSON.stringify(data));
    window.localStorage.setItem('index_calendario', get_calendario_index() + 1);
}

function get_events_by_medicamento(id) {
    var data_return = [];
    var calendar = get_calendario();
    var data = eval(calendar);

    for (var i = 0; i < data.length; i++)
    {
        if (data[i].med == id)
            data_return.push(data[i].id);
    }

    return data_return;
}

function delete_calendario(array_id)
{
    var data_return = [];

    if (array_id != 'all')
    {
        var calendar = get_calendario();
        var data = eval(calendar);

        for (var i = 0; i < data.length; i++)
        {
            if (array_id.indexOf(data[i].id) == -1)
                data_return.push(data[i]);
        }
    }
    else
        window.localStorage.setItem('index_calendario', 0);


    window.localStorage.setItem('calendario', JSON.stringify(data_return));
}

function show_right_panel()
{
    $('#right_panel').height(content_height).show();
    $('#right_panel .panel_in').width(width - 40).height(content_height - 30);
    rightScroll = new iScroll('right_panel', {checkDOMChanges: true, useTransform: css_transform});
    $('#right_panel').animate({right: 0}, 500);
}

function hide_right_panel()
{
    $('#right_panel').animate({right: "-100%"}, 500, function() {
        $('#right_panel').height(0);
    });
}

document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, false);


document.addEventListener("deviceready", redcrea, false);


    function onSuccess(position) {
        alert("geo 2");
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + position.timestamp                    + '<br />';
    }

function redcrea() {


    //is_online = (navigator.connection.type != Connection.NONE);

    //window.plugin.notification.local.onclick = function(id, state, json) {
    //    var redirect = JSON.parse(json).type;
    //    window.location = redirect + '.html';
    //};

    window.addEventListener('load', function() {
        new FastClick(document.body);
    }, false);
    

    function init(){

        width = $(window).width();
        height = $(window).height();
        content_height = height - 45;
        if (!$('#wrapper').hasClass('no_scroll'))
        {
            myScroll = new iScroll('wrapper', {checkDOMChanges: true, useTransform: css_transform, onBeforeScrollStart: function(e) {
                    var target = e.target;
                    while (target.nodeType != 1)
                        target = target.parentNode;

                    if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
                        e.preventDefault();
                }});
        }
        /*
         window.localStorage.removeItem("user_id");
                 window.localStorage.removeItem("user");
        */
        var html = '<ul>';
        
           html += '<li><a href="index.html"><img src="img/menu/noticias.png" /><span>Home</span></a></li><li><a href="totalpedidos.html"><img src="img/menu/entrar.png" /><span>Pedidos</span></a></li>';
        
        
        html += '</ul>';
        $('#menu').html(html);
        width = $(window).width();
        height = $(window).height();
        content_height = height - 45;
        $('#menu').height(content_height);
        menuScroll = new iScroll('menu', {checkDOMChanges: true, useTransform: css_transform, bounce: false});
        menuScroll.scrollTo(0, 0);

        $('.content').css("min-height", content_height - 30);

        if (is_iPad)
        {
            $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', 'css/ipad.css'));
        }
    }

    function show_menu()
    {
        if ($('#menu').height() === 0)
            $('#menu').height(content_height);
        $('#menu').animate({left: 0}, 500);
        if (typeof rightScroll !== 'undefined')
        {
            hide_right_panel();
        }
    }

    function hide_menu()
    {
        $('#menu').animate({left: "-105%"}, 500);
        if (typeof menuScroll !== 'undefined')
            menuScroll.scrollTo(0, 0);
    }

    function is_menu_visible()
    {
        var current_left = $('#menu').css('left');
        return (current_left == "0px");
    }

    function toogle_menu() {
        if (is_menu_visible())
            hide_menu();
        else
            show_menu();
    }

    document.addEventListener("backbutton", function() {
        if (is_menu_visible())
            hide_menu();

        hide_right_panel();

        if ($('.index_page').length)
        {
            confirma_salida();
        }

        if ($('#back a').length)
        {
            window.location = $('#back a').attr('href');
        }
    }, false);

    document.addEventListener("menubutton", function() {
        toogle_menu();
    }, false);

    $(document).on('click', '#close_app', function() {

        navigator.app.exitApp();
    });


    $(document).on('click', '#close_session', function() {


        window.localStorage.removeItem("user_id");
        window.localStorage.removeItem("user");


        navigator.app.exitApp();
    });



    $(".panel_auto_close").swipe({
        swipeRight: function(event, direction, distance, duration, fingerCount, fingerData) {
            hide_right_panel();
        },
        threshold: 10
    });

    $(document).on('click', '#menu_action', function() {
        toogle_menu();
    });

    $("#menu, #menu *").swipe({
        swipeLeft: function(event, direction, distance, duration, fingerCount, fingerData) {
            hide_menu();
        },
        threshold: 10
    });

    $(document).on('click', 'a#close_panel', function() {
        hide_right_panel();
    });

    $(document).on('click', '#mostrar_aviso', function() {
        show_right_panel();
    });

    $(document).on('click', 'a#reload', function() {
        window.location.reload();
    });

    var page_name = $('#wrapper').attr('data-rel');
    
    if (typeof page_name !== 'undefined')
    {
        
       
        $.getScript('js/pages/' + page_name + '.js')
                .done(function(script, textStatus) {
                    var fn = window[page_name];
                    if (typeof fn === 'function') {
                        fn();
                    }
                })
                .fail(function(jqxhr, settings, exception) {
                    alerta('Fallo al cargar un función externa commo');
                });
    }

    var section_name = $('.content').attr('data-rel');
    
   
    if (typeof section_name !== 'undefined')
    {
        alerta("No cargo js");
        show_overlay();

        $.jsonp({
            url: services_url + "page",
            callbackParameter: "callback",
            timeout: time_out,
            data: {id: section_name},
            success: function(data) {
                $(".content").html(data.d);
                hide_overlay();
            },
            error: function(xOptions, textStatus) {
                hide_overlay();
                notify_offline();
            }
        });
    }

    init();
}