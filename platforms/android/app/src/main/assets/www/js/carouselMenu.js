document.addEventListener('deviceready', function(){
	
	if(localStorage.getItem("banners") != null || localStorage.getItem("banners") != undefined ){
        var data = JSON.parse(localStorage.getItem("banners"));
        
        if(data.length){
            var listRedencion = $("#listRedencion");
            if(data.length > 0){
                $.each(data, function(index, object){

                    var li = $("<li>",{ "data-target" : "#carrouselBanners", "data-slide-to" : index, class : (index == 0 ? "active" : "") });
                    $("#indicadorBanners").append(li);
                    
                    var item = $("<div>",{class : ( index == 0 ? "item active" : "item")});
                    switch(object.tipo){
                        case "b":
                            var img = $("<img>", { src : object.ruta, alt : object.nombre }).css({width : "auto", height : "200px"});
                            item.append(img);
                            $("#carrusel2").append(item);

                            img.click(function(){
                                $("#carrouselBanners").carousel('pause');
                            });
                        break;
                    }

                    $(".carousel-control").click(function(){
                        $("#carrouselBanners").carousel('cycle');
                    });

                    li.click(function(){
                        $("#carrouselBanners").carousel('cycle');
                    });
                });    
            }
        }
    }

}, false);