$(document).on("ready",function(){
	
	var alarm = $(".alert");
    alarm.hide(); 
	
	document.addEventListener("backbutton", onBackKeyDown, false);            
    
    function onBackKeyDown() {                
        if (is_menu_visible()){
            hide_menu();            
        }else{
            alarm.show();    
        }            
    }

    $('.ok').on('click',function() {
                
        var action  = $(this).attr("data-action");
        
        switch (action){
            case "1":
                navigator.app.exitApp();
            break;
            case "0":
                alarm.hide();
            break;
        }
    });

    $('#btnClose').on('click',function() {
    	hide_menu();             
        alarm.show();
    });

});