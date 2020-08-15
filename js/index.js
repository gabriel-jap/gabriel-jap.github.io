

document.addEventListener("DOMContentLoaded", function (e) {
    const salida = document.getElementById('logoutButton');
    salida.onclick = () => {
        localStorage.clear();
    }

    // window.onload = () => {
        let token =localStorage.getItem('token');
        let google = localStorage.getItem('oauth2_ss::https://gabriel-jap.github.io::1::DEFAULT::_ss_')
        alert("Reciví "+token )
        if ((!token)) {
            console.log("no hay google")
            document.location.href = "login.html";
        }else{
            console.log("estoy en inicio")
        }
    //}

    

})