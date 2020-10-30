

document.addEventListener("DOMContentLoaded", function (e) {

   let user = "";

   const backUrl = 'http://localhost:8080';
const loginForm = document.getElementById('form_login');
loginForm.onsubmit = (e) => {
e.preventDefault()
user = document.getElementById('textboxEmail').value;
const password = document.getElementById('textboxPassword').value;
getJSONData('/auth', {user,password});
}
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
   const info={name: user,surname: "",age: "",email: user,tel: "",pic: "",}
   localStorage.setItem('datos', JSON.stringify(info));
   window.location.href="index.html";
   });
   }

});



