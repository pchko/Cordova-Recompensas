document.addEventListener('deviceready', function(){
	
	if(localStorage.getItem("banners") != null || localStorage.getItem("banners") != undefined ){
        var data = JSON.parse(localStorage.getItem("banners"));
        var list = $("#listRedencion");
        var carousel = $("#carouselGallery");
        if(data.length){
            if(data.length > 0){
                $.each(data, function(index, object){
                    var item = $("<div>", {class : "item"}).css({"margin-right" : "1vw", "margin-top" : "1vh"});
                    var image = $("<img>",{src : object.ruta}).css({width : "150px", border : "1px solid white"});
                    var imageCarousel = $("<img>",{src : object.ruta}).css({width : "60vw", border : "1px solid white"});
                    carousel.append(item.append(imageCarousel));
                    image.click(function(){
                        $("#divGallery").addClass("open");
                    });

                    list.append(image);

                    /*
                    var li = $("<li>",{ "data-target" : "#carruselBanners", "data-slide-to" : index, class : (index == 0 ? "active" : "") });
                    $("#indicadorBanners1").append(li);
                    
                    var item = $("<div>",{class : ( index == 0 ? "item active" : "item")});
                    switch(object.tipo){
                        case "b":
                            var img = $("<img>", { src : object.ruta, alt : object.nombre }).css({width : "auto", height : "200px"});
                            item.append(img);
                            $("#carrusel2").append(item);

                            img.click(function(){
                                $("#carruselBanners").carousel('pause');
                            });
                        break;
                    }

                    $(".carousel-control").click(function(){
                        $("#carruselBanners").carousel('cycle');
                    });

                    li.click(function(){
                        $("#carruselBanners").carousel('cycle');
                    });
                    */

                });    

                carousel.owlCarousel({
                    stagePadding: 0,
                    loop:true,
                    margin: 0,
                    nav:true,
                    autoWidth:true
                });

                 $("#btnCloseGallery").click(function(){
                    $("#divGallery").removeClass("open");
                });
            }
            
        }


       
    }

}, false);