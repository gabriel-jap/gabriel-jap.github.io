var status = localStorage.getItem('login'); //obtiene el objeto con id "login" (objeto creado en loginOk())
if (status != "ok" ){ //compara el objeto para saber si la autentificación fue exitosa o no
location.replace("login.html") // en caso de no serlo, es llevado al login
}