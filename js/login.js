document.addEventListener("DOMContentLoaded", function (e) {

   const backUrl = 'http://localhost:8080';
const loginForm = document.getElementById('form_login');
loginForm.onsubmit = (e) => {
e.preventDefault()
const user = document.getElementById('textboxEmail').value;
const password = document.getElementById('textboxPassword').value;
getJSONData('/auth', {user,password});
}
   
   // var formulario = document.getElementById("form_login");
   // formulario.addEventListener("submit", function (event) {
   //    event.preventDefault();//Cortamos el procedimiento usual de un submit
   //    loginOk();
   // })
   const getJSONData = function(endpoint, userData){
   let url = `${backUrl}${endpoint}`;
   fetch(url, {
   method: 'POST',
   body: JSON.stringify(userData),
   headers:{'Content-Type': 'application/json'}
   }).then(res => res.json())
   .catch(error => {
   alert('Usuario y/o contraseÃ±a incorrecta')
   })
   .then(response => {
   console.log('Success:', response)
   localStorage.setItem('token', response.token);
   window.location.href = 'https://gabriel-jap.github.io/index.html';
   });
   }

   
   function loginOk() { //creamos un objeto que indique que el proceso fue correcto y enviamos a pagina de inicio
      console.log("loginOk")
      localStorage.setItem('token', 'google');
      document.location.href = "https://gabriel-jap.github.io/index.html";
   }
   
   


});



