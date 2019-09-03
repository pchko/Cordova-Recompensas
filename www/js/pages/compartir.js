function compartir() {
    show_overlay();
    $.jsonp({
        url: services_url + "config",
        callbackParameter: "callback", timeout: time_out,
        success: function(data) {
            if (data.d != '0')
            {
                for (var i=0; i<data.d.length; i++)
                    eval(data.d[i]);
                
                var url = (isAndroid)?(url_app_and):(url_app_ios);

                $('#fb').click(function(){
                    openURL('http://www.facebook.com/sharer.php?u=' + url);
                });

                $('#tw').click(function(){
                    openURL('http://twitter.com/share?text=' + txt_share_tw + '&url=' + url);
                });
                
                $('#go').click(function(){
                    openURL('https://plus.google.com/share?url=' + url);
                });   
                
                hide_overlay();
            }
            else
                notify_offline();
        },
        error: function(xOptions, textStatus) {
            notify_offline();
        }
    });
        
}