document.addEventListener("deviceready",function(){

    var video = $("<video>", {id : "myvideo", autoplay : true, controls : true}).css({height:"200px", width:"100%"});
    var source = $("<source>",{src: "img/principal.mp4", type:"video/mp4"});
    $("#video").append(video.append(source));

    alert("ready");

	var anuncio = $(".alert");
	document.addEventListener("backbutton",backButton);
	function is_menu_visible(){
        var current_left = $('#menu').css('left');        
        return (current_left == "0px");
    }

    function hide_menu(){
        $('#menu').animate({left: "-105%"}, 500);
        if (typeof menuScroll !== 'undefined')
            menuScroll.scrollTo(0, 0);
    }

    function backButton(){    	
    	if (is_menu_visible()){    	
            hide_menu();        
        }else{            
        	anuncio.show();
        }
    }
}, false);