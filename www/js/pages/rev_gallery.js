function rev_gallery() {
   
    show_overlay();
    var id = $_GET('id');
    if (typeof id !== 'undefined')
    {
        $.jsonp({
            url: services_url + "rev_id",
            callbackParameter: "callback", timeout: time_out,
            data: {id: id},
            success: function(data) {
                var imgs = eval(data.d);
                var count = imgs.length;
                if (count > 0)
                {
                    var zoom = (androidVersion < 4.0) ? ('<div class="gsZoomIn" data-elem="zoomIn" data-on="autoAlpha:1; cursor: pointer;" data-off="autoAlpha:0.5; cursor:default"> </div><div class="gsZoomOut" data-elem="zoomOut" data-on="autoAlpha:1; cursor: pointer;" data-off="autoAlpha:0.5; cursor:default"> </div>') : ('');
                    var html = '<div class="slider" data-elem="slider"><div class="slides" data-elem="slides" data-options="preloaderUrl:img/loader.gif; loop: false;" ></div>' + zoom + '<div class="gsPrev midLeft" data-elem="prev" data-on="autoAlpha:1; cursor: pointer;" data-off="autoAlpha:0.5; cursor:default"></div><div class="gsNext midRight" data-elem="next" data-on="autoAlpha:1; cursor: pointer;" data-off="autoAlpha:0.5; cursor:default"> </div><ul id="gallery_elements" data-elem="items">';
                    var ul = '';
                    for (var i = 0; i < imgs.length; i++)
                    {
                        ul += '<li><img src="' + assets_url + 'rev/' + imgs[i] + '" /></li>';
                    }

                    html = html + ul + '</ul></div>';
                    $('.content').html(html);
                    hide_overlay();
                    TouchNSwipe.init();
                }
                else
                {
                    $('.content').html('<p>No existen imágenes para mostrar</p>');
                    hide_overlay();
                }
            },
            error: function(xOptions, textStatus) {
                notify_offline();
            }
        });
    }
    else
    {
        notify_error();
    }
}