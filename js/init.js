const CATEGORIES_URL = "http://localhost:3000/JSON/categories";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/JSON/publish_ok";
const CATEGORY_INFO_URL = "http://localhost:3000/JSON/info_categories";
const PRODUCTS_URL = "http://localhost:3000/JSON/autos";
const PRODUCT_INFO_URL = "http://localhost:3000/JSON/auto";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/JSON/comments";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "http://localhost:3000/JSON/buy_ok";



var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}
var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}
var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}
document.addEventListener("DOMContentLoaded", function (e) {
  const btnuser = document.getElementById("bttnuser");
  const username = document.getElementById("username");
  const salida = document.getElementById('logoutButton');
  const imagen = document.getElementById('userimage');

  let user = JSON.parse(localStorage.getItem("datos"))
  btnuser.innerText = user.name
  username.innerHTML = user.name
  imagen.src = user.pic
  salida.onclick = () => {
    console.log("logout")
    localStorage.clear();
    document.location.href = "login.html";
  }
  window.onload = () => {
    let token = localStorage.getItem('token');
    //let google = localStorage.getItem('oauth2_ss::https://gabriel-jap.github.io::1::DEFAULT::_ss_')
    if (token === null) { document.location.href = "login.html"; }
  }

})


