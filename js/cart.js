const CARRITO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const cart = document.getElementById("carrito")
const subTotal = document.getElementById("subTotal")
const envio = document.getElementById("envio")
const total = document.getElementById("total")
const preciosTotales = document.getElementsByClassName("precio")
const dmEnvio = document.getElementById("dropMenuEnvio")
const enviotext = document.getElementById("envio")
const totaltext = document.getElementById("total")
const compra = document.getElementById("btnbuy")

let sendMode = "5"
let moneda = []
let htmltoappend = "";

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CARRITO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carrito = resultObj.data;

            htmltoappend = ""
            for (let index = 0; index < carrito.articles.length; index++) {
                const producto = carrito.articles[index];
                htmltoappend += `
                <div class="list-group-item">
                    <div class="row">
                        <div class="col-sm-2">
                            <img src="`+ producto.src + `" height="85">
                        </div>
                        <div class="col-sm-4">
                            <p class="font-weight-bolder">`+ producto.name + `</p>
                        </div>
                        <div class="col-sm-2">
                            <p class="font-weight-bold">`+ producto.currency + ` ` + producto.unitCost + `</p>
                        </div>
                        <div class="col-sm-2">
                            <input type="number" id="cant`+ index + `" name="quantity" min="1" value="` + producto.count + `" precio="` + producto.unitCost + `" placeholder="Cantidad">
                        </div>
                        <div class="col-sm-2">
                            <p>` + producto.currency + ` </p><p id="totalcant` + index + `" class="text-muted precio">` + producto.unitCost * producto.count + `</p>
                        </div>
                    </div>
                </div>
                `;
                if (producto.currency === "USD") {
                    moneda.push("USD")
                } else {
                    moneda.push("otherCurrency")
                }
            }
            cart.innerHTML = htmltoappend;

            const inputNumber = document.getElementsByName("quantity")
            inputNumber.forEach(element => {
                element.addEventListener("change", function (e) {
                    if (this.value < 1) {
                        this.value = 1
                    }
                    document.getElementById("total" + element.id).innerHTML = parseInt(element.getAttribute("precio")) * this.value
                    updateCart();
                });
            });
        }
        updateCart();
    });



    document.getElementById("sSendMode").addEventListener("click", () => porcentaje(5, "sSendMode"));
    document.getElementById("eSendMode").addEventListener("click", () => porcentaje(7, "eSendMode"));
    document.getElementById("pSendMode").addEventListener("click", () => porcentaje(15, "pSendMode"));

});

function updateCart() {
    let acc = 0
    let envio = 0

    for (let index = 0; index < preciosTotales.length; index++) {
        const element = preciosTotales[index];
        if (moneda[index] === "USD") {
            acc += parseInt(element.innerText) * 40
        } else {
            acc += parseInt(element.innerText)
        }

    }
    subTotal.innerText = acc

    envio = acc * sendMode / 100
    enviotext.innerText = envio

    totaltext.innerText = acc + envio
}

function porcentaje(num, elem) {
    sendMode = num
    dmEnvio.innerText = document.getElementById(elem).innerHTML
    updateCart();
    compra.disabled = false
}