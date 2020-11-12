const CARRITO_URL = "http://localhost:3000/JSON/cart";
const cart = document.getElementById("carrito")
const subTotal = document.getElementById("subTotal")
const total = document.getElementById("total")
const dmEnvio = document.getElementById("dropMenuEnvio")
const enviotext = document.getElementById("envio")
const totaltext = document.getElementById("total")
const compra = document.getElementById("btnbuy")
const formDir = document.getElementById("formDir")
let preciosTotales = document.getElementsByClassName("precio")
let productos = []
let sendMode = 150
let inputDir = false
let direccion = {
    pais: '',
    calle: '',
    nro: '',
    esquina: '',
}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CARRITO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let carrito = resultObj.data;
            for (let index = 0; index < carrito.articles.length; index++) {
                const producto = carrito.articles[index];
                let fila = {
                    src: producto.src,
                    name: producto.name,
                    currency: producto.currency,
                    unitCost: producto.unitCost,
                    count: producto.count,
                }
                productos.push(fila);
                
            }
            drawCart()

            
            
        }
        updateCart();
    });

    dmEnvio.addEventListener("click",function () {
        if (!(inputDir)) {
            inputDir= !inputDir
            $('#dirModal').modal('toggle')


        }
    })

    document.getElementById("sSendMode").addEventListener("click", () => porcentaje(5, "sSendMode"));
    document.getElementById("eSendMode").addEventListener("click", () => porcentaje(7, "eSendMode"));
    document.getElementById("pSendMode").addEventListener("click", () => porcentaje(15, "pSendMode"));

    formDir.addEventListener("submit", function (event) {
        event.preventDefault()
        direccion.pais = document.getElementById("ctry").value
        direccion.calle = document.getElementById("calle").value
        direccion.nro = document.getElementById("dirNro").value
        direccion.esquina = document.getElementById("dirCor").value
        $('#dirModal').modal('toggle')
    })
});

function drawCart(){
    let htmltoappend = ""

    if (productos.length>0) {
        for (let index = 0; index < productos.length; index++) {
        const fila = productos[index];
        htmltoappend += `
                <div class="list-group-item">
                    <div class="row" id="product">
                        <div class="col-sm-2">
                            <img src="`+ fila.src + `" height="85">
                        </div>
                        <div class="col-sm-3">
                            <p class="font-weight-bolder">`+ fila.name + `</p>
                        </div>
                        <div class="col-sm-2">
                            <p class="font-weight-bold">`+ fila.currency + ` ` + fila.unitCost + `</p>
                        </div>
                        <div class="col-sm-2">
                            <input type="number" id="cant`+ index + `" name="quantity" min="1" value="` + fila.count + `" precio="` + fila.unitCost + `" placeholder="Cantidad">
                        </div>
                        <div class="col-sm-2">
                            <p>` + fila.currency + ` </p><p id="totalcant` + index + `" class="text-muted precio">` + fila.unitCost * fila.count + `</p>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="close" aria-label="Close" name="close" id="closeline`+index+`" close="` + index + `">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>
                `
    }
    }else{
        htmltoappend = `
        <div class="list-group-item" style="background-color: antiquewhite;">
            <div class="row">
                <h3>No se encontraron Articulos</h3>
            </div>
        </div>
        `
    }
    cart.innerHTML = htmltoappend;
    preciosTotales = document.getElementsByClassName("precio")

    const inputNumber = document.getElementsByName("quantity")
            const removeProduct = document.getElementsByName("close")
            inputNumber.forEach(element => {
                element.addEventListener("change", function (e) {
                    if (this.value < 1) {
                        this.value = 1
                    }
                    document.getElementById("total" + element.id).innerHTML = parseInt(element.getAttribute("precio")) * this.value
                    updateCart()
                });
            });
            removeProduct.forEach(cruz => {
                cruz.addEventListener("click", function (e) {
                    productos.splice(cruz.getAttribute("close"), 1)
                    drawCart()
                    updateCart()
                })
            })
}

function updateCart() {
    

    let acc = 0
    let envio = 0

    for (let index = 0; index < preciosTotales.length; index++) {
        const element = preciosTotales[index];
        if (productos[index].currency === "USD") {
            acc += parseInt(element.innerText) * 40
        } else {
            acc += parseInt(element.innerText)
        }

    }
    subTotal.innerText = acc

    if (sendMode<100) {
        envio = acc * sendMode / 100
        enviotext.innerText = envio
        totaltext.innerText = acc + envio
    }

}

function porcentaje(num, elem) {
    sendMode = num
    dmEnvio.innerText = document.getElementById(elem).innerHTML
    updateCart();
    compra.disabled = false
    
    
}
