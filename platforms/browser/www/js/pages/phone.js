function phone() {

}

function confirmar() {
  alert("click");
  if($("#telefono").val() ==""){
    alert("Por favor escriba su Número Teléfonico");
  }else{
    window.localStorage.setItem('number_tphone', $("#telefono").val());
    window.location = 'index.html';
  }
}