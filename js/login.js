document.addEventListener("DOMContentLoaded", function (e) {

   var formulario = document.getElementById("form_login");
   formulario.addEventListener("submit", function (event) {
      event.preventDefault();//Cortamos el procedimiento usual de un submit
      loginOk();
   })
   
});


function loginOk() { //creamos un objeto que indique que el proceso fue correcto y enviamos a pagina de inicio
   localStorage.setItem('login', 'ok');
   document.location.href = "index.html";
}

function onSignIn(googleUser){
   var profile = googleUser.getBasicProfile();
   console.log(profile);
   loginOk();
}