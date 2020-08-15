

document.addEventListener("DOMContentLoaded", function (e) {
    const salida = document.getElementById('logoutButton');
    salida.onclick = () => {
        localStorage.clear();
        console.log("logout")
        document.location.href = "login.html";
    }

     

    

})

window.onload = () => {
        let token =localStorage.getItem('token');
        let google = localStorage.getItem('oauth2_ss::https://gabriel-jap.github.io::1::DEFAULT::_ss_')
        if (token===null) {
            console.log("no hay token")
            document.location.href = "login.html";
        }else{
            console.log("estoy en inicio")
        }
    }