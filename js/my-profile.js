const inputUsername = document.getElementById("usernameForm")
const inputSurname = document.getElementById("surnameForm")
const inputAge = document.getElementById("ageForm")
const inputEmail = document.getElementById("eMailForm")
const inputTel = document.getElementById("telForm")
const inputNewPic = document.getElementById("photoForm")
const userPic = document.getElementById("photoUser")
const formUser = document.getElementById("userChange")
const pastuser = localStorage.getItem("datos")
var newImg = ""

function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) { // donde ocurre la magia

        userPic.src=e.target.result;
        newImg=e.target.result;
      }
      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }

  inputNewPic.addEventListener("change",function(){
      readURL(this)
  })

document.addEventListener("DOMContentLoaded", function (e) {
    let user = JSON.parse(localStorage.getItem("datos"))
    inputUsername.value = user.name
    inputSurname.value = user.surname
    inputAge.value = user.age
    inputEmail.value = user.email
    inputTel.value = user.tel
    userPic.src=user.pic
});

formUser.addEventListener("submit", function (e) {
    e.preventDefault();
    let datos = {
        name: inputUsername.value,
        surname: inputSurname.value,
        age: inputAge.value,
        email: inputEmail.value,
        tel: inputTel.value,
        pic: newImg,
    };
    localStorage.setItem("datos", JSON.stringify(datos));
})


