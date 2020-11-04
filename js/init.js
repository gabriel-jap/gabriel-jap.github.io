const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";



var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}
var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

function getBase64Image() {
  var elephant = document.getElementById("photoUser");
    var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");

    // Make sure canvas is as big as the picture
    imgCanvas.width = elephant.width;
    imgCanvas.height = elephant.height;

    // Draw image into canvas element
    imgContext.drawImage(elephant, 0, 0, elephant.width, elephant.height);

    // Get canvas contents as a data URL
    var imgAsDataURL = imgCanvas.toDataURL("image/png");

    // Save image into localStorage
    try {
        localStorage.setItem("elephant", imgAsDataURL);
    }
    catch (e) {
        console.log("Storage failed: " + e);
    }; 
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
  const btnuser = document.getElementById("username");
  console.log(btnuser);
  const salida = document.getElementById('logoutButton');

  let user = JSON.parse(localStorage.getItem("datos"))
  btnuser.innerText=user.name
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


