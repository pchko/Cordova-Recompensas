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
            $.each(data.subcategorias, function(index, element){
                var container = $("<div>",{class : "ui-element"});
                var button = $("<a>",{ href : "subcategoria.html?id="+element.id, class : "btn"}).text(element.nombre);
                div.append(container.append(button));
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


