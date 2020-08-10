//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

document.getElementById("btn_login").addEventListener("click", function(){
    console.log("aprete boton");
    document.location.href="index.html"
})