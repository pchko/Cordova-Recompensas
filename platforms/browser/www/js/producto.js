document.addEventListener('deviceready', function(){

    if(localStorage.getItem('subcategorias') != null && localStorage.getItem('subcategorias') != undefined){
        var idProducto = getParameterByName("index");
        var idCat = getParameterByName("idCat");
        var subcategoria = JSON.parse(localStorage.getItem('subcategorias'));
        var producto = subcategoria[idProducto];
        console.log(producto);

        $("#titleProducto").text(producto.nombre);
        $("#descripcion").text(producto.descripcion);
        $("#imagen").attr("src", producto.imagen);


        $("#linkBack").attr("href", "subcategoria.html?id="+idCat);

        function getParameterByName(name, url=window.location.href){
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }    
    }else{
        window.location = "home.html";
    }
    

}, false);


document.addEventListener("backbutton",backButton);

function backButton(){      
    window.location="subcategoria.html?id="+idCat;
}


