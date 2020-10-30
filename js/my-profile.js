const inputUsername = document.getElementById("usernameForm")
const inputSurname = document.getElementById("surnameForm")
const inputAge = document.getElementById("ageForm")
const inputEmail = document.getElementById("eMailForm")
const inputTel = document.getElementById("telForm")
const inputNewPic = document.getElementById("photoForm")
const userPic = document.getElementById("photoUser")
const save = document.getElementById("btnSave")
const pastuser = localStorage.getItem("datos")

document.addEventListener("DOMContentLoaded", function (e) {
    let user = JSON.parse(localStorage.getItem("datos"))
    inputUsername.value = user.name
    inputSurname.value = user.surname
    inputAge.value = user.age
    inputEmail.value = user.email
    inputTel.value = user.tel
});

save.addEventListener("click", e =>{
    //Funciona
    userPic.setAttribute("src", "https://i.ibb.co/1GQWg5Z/gato.png")
    let datos = {
        name: inputUsername.value,
        surname: inputSurname.value,
        age: inputAge.value,
        email: inputEmail.value,
        tel: inputTel.value,
        pic: inputNewPic.value,
    }
    localStorage.setItem("datos", JSON.stringify(datos))
    location.reload()
})
