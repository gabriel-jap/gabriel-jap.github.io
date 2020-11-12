const defaultImg="data:image/png;base64,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";

document.addEventListener("DOMContentLoaded", function (e) {
   const app = firebase.app();
   let user = "";

   function googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(result=>{
          const user = result.user;
          console.log(user.displayName);
      })
  }

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
   const info={name: user,surname: "",age: "",email: user,tel: "",pic: defaultImg,}
   localStorage.setItem('datos', JSON.stringify(info));
   window.location.href="index.html";
   });
   }

});



