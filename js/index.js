window.onload = () => {
    let token =localStorage.getItem('token');
    if (!token) {
        document.location.href = "login.html";
    }
}