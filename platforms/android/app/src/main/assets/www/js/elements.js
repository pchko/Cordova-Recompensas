
function init(){

	var is_iPad = navigator.userAgent.match(/iPad/i) != null;
	var css_transform = (androidVersion >= 4 || !isAndroid);
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1;
	var androidVersion = parseFloat(ua.slice(ua.indexOf("android") + 8));
    var width = $(window).width();
    var height = $(window).height();
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
    
       html += '<li><a id="btnHome" href="index.html"><img src="img/menu/noticias.png" /><span>Home</span></a></li>';
       html+='<li><a id="btnClose" href="javascript:;"><img src="img/menu/close.png" /><span>Cerrar</span></a></li>';
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

function show_menu(){
    if ($('#menu').height() === 0)
        $('#menu').height($(window).height()-45);
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

function is_menu_visible(){
    var current_left = $('#menu').css('left');
    return (current_left == "0px");
}

function toogle_menu(){
    if (is_menu_visible())
        hide_menu();
    else
        show_menu();
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



