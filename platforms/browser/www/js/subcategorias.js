document.addEventListener('deviceready', function(){

    var apiKey = "PXLALA";
    var idCategory = getParameterByName("id");
    $.ajax({
        crossDomain:true,
        type: "POST",
        timeout: 8000,
        url: "https://pixanit.com/lala/ws/index.php",
        data: {m:"lista_subcategorias", idCat: idCategory,  key : apiKey},
        dataType: "json",
        beforeSend: function(){
            var options = { dimBackground: true };
            SpinnerPlugin.activityStart("Espere por favor...", options);
        }
    }).done(function(data){
        //window.plugins.spinnerDialog.hide();
        SpinnerPlugin.activityStop();
        var div = $("#divSubcategorias");
        if(data && data.subcategorias){
        	var row = $("<div>").css({display: "inline-flex", width: "90vw"});
        	localStorage.setItem("subcategorias", JSON.stringify(data.subcategorias));
            $.each(data.subcategorias, function(index, element){
            	var item = $("<div>",{class : "itemCat"});
            	var img = $("<img>",{ src : element.imagen }).css({width: "auto", "max-width": "27vw", height: "20vh"});
            	var nombre = $("<p>").text(element.nombre);

            	item.append(img).append(nombre);
            	
            	if( (index+1) % 3 == 0 || data.subcategorias.length == index+1){
            		console.log("If:"+(index+1));
            		row.append(item);
            		div.append(row);
            		row = row.clone();
            		row.empty();
            	}else{
            		console.log("Else:"+(index+1));
            		
            		row.append(item);
            	}

            	item.click(function(){
            		window.location = "producto.html?idCat="+idCategory+"&index="+index;
            	});
            });
        }
     	navigator.notification.alert(JSON.stringify(data));
        
    }).fail(function(data){
        //window.plugins.spinnerDialog.hide();
        SpinnerPlugin.activityStop();
        navigator.notification.alert(JSON.stringify(data));
    });

    function getParameterByName(name, url=window.location.href){
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

}, false);


document.addEventListener("backbutton",backButton);

function backButton(){      
    window.location="home.html";
}


