document.addEventListener("DOMContentLoaded", function (e) {

   var formulario = document.getElementById("form_login");
   formulario.addEventListener("submit", function (event) {
      event.preventDefault();//Cortamos el procedimiento usual de un submit
      loginOk();
   })
   
});


function loginOk() { //creamos un objeto que indique que el proceso fue correcto y enviamos a pagina de inicio
   console.log("loginOk")
   localStorage.setItem('login', 'ok');
   console.log(localStorage.getItem('login'))
   document.location.href = "https://gabriel-jap.github.io/index.html";
}

function onSignIn(googleUser){
   var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        loginOk();
}