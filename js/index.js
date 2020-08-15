

document.addEventListener("DOMContentLoaded", function (e) {
    const salida = document.getElementById('logoutButton');
    salida.onclick = () => {
        localStorage.clear();
    }

    // window.onload = () => {
        let token =localStorage.getItem('token');
        console.log("Reciví "+token )
        if (!token) {
            console.log("hmm")
            document.location.href = "login.html";
        }else{
            console.log("no")
        }
    //}

    

})