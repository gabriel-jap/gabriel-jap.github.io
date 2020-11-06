// function readURL(input) {
//       var reader = new FileReader();
//       reader.onload = function(e) {
//         userPic.src=e.target.result;
//         newImg=e.target.result;
//       }
//       reader.readAsDataURL(input.files[0]); 
//   }
//   inputNewPic.addEventListener("change",function(event){
//       readURL(this)
//   })
document.addEventListener("DOMContentLoaded", function () {
    const inputUsername = document.getElementById("usernameForm")
    const inputSurname = document.getElementById("surnameForm")
    const inputAge = document.getElementById("ageForm")
    const inputEmail = document.getElementById("eMailForm")
    const inputTel = document.getElementById("telForm")
    const inputNewPic = document.getElementById("photoForm")
    const userPic = document.getElementById("photoUser")
    const formUser = document.getElementById("userChange")
    const user = JSON.parse(localStorage.getItem("datos"))
    
    var newImg = user.pic;

    //Cargamos los datos anteriores
    inputUsername.value = user.name
    inputSurname.value = user.surname
    inputAge.value = user.age
    inputEmail.value = user.email
    inputTel.value = user.tel
    userPic.src = user.pic
    
    inputNewPic.onchange = () => {//Al subir una imagen
        var reader = new FileReader();
        reader.onload = function (event) {
            userPic.src = event.target.result;//Cambiamos el <img> por la nueva imagen
            newImg = event.target.result;//guardamos la imagen en una variable
        }
        reader.readAsDataURL(inputNewPic.files[0]);
        
    }

    formUser.onsubmit = (e) => {
        e.preventDefault();
        let datos = {//nuevos datos a ingresar
            name: inputUsername.value,
            surname: inputSurname.value,
            age: inputAge.value,
            email: inputEmail.value,
            tel: inputTel.value,
            pic: newImg,
        };
        localStorage.setItem("datos", JSON.stringify(datos));
        location.reload();
    }
});




