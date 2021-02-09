document.addEventListener('deviceready', function(){

    var apiKey = "PXLALA";

    $.ajax({
        crossDomain:true,
        type: "POST",
        timeout: 8000,
        url: "https://pixanit.com/lala/ws/index.php",
        data: {m:"lista_categorias", key : apiKey},
        dataType: "json",
        beforeSend: function(){
            var options = { dimBackground: true };
            SpinnerPlugin.activityStart("Espere por favor...", options);
        }
    }).done(function(data){
        //window.plugins.spinnerDialog.hide();
        SpinnerPlugin.activityStop();
        var div = $("#divCategorias");
        if(data && data.categorias){
            $.each(data.categorias, function(index, element){
                var container = $("<div>",{class : "ui-element"});
                var button = $("<a>",{ href : "subcategoria.html?id="+element.id_categoria, class : "btn"}).text(element.nombre_categoria);
                div.append(container.append(button));
            });
        }
        
    }).fail(function(data){
        //window.plugins.spinnerDialog.hide();
        SpinnerPlugin.activityStop();
        navigator.notification.alert(JSON.stringify(data));
    });

}, false);


document.addEventListener("backbutton",backButton);

function backButton(){      
    window.location="home.html";
}
