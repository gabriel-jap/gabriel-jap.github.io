const titule = document.getElementById("productName")
const desc = document.getElementById("productDesc")
const cost = document.getElementById("productCost")
const img = document.getElementById("gallery")
const vend = document.getElementById("prodVend")
const categories = document.getElementById("cat")
const relacionados = document.getElementById("related")
const comentarios = document.getElementById("coments")
const form = document.getElementById("form-comment")
let formText = document.getElementById("comentario")
let radios = document.getElementsByName("score")


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            obj = resultObj.data;

            titule.innerText = obj.name;//Titulo (nombre del articulo)

            desc.innerHTML = obj.description;//Descripscion

            cost.innerHTML = obj.cost + " " + obj.currency;//Monto y tipo de cambio


            obj.images.forEach(element => {//montar la galeria
                img.innerHTML += '<span class="carousel-item"><img class="d-block w-100" src="' + element + '"></span>'
            });
            document.getElementsByTagName("span")[0].setAttribute("class", "carousel-item active")

            vend.innerText = obj.soldCount + " articulos vendidos";//relevancia (numero de vendidos)

            categories.innerHTML = obj.category + "→" //ruta (categoria)

            obj.relatedProducts.forEach(element => {//productos relacionados 
                relacionados.innerHTML += '<div class="col-md-4"><a class="card mb-4 shadow-sm custom-card"><img src=img/car' + element + '.jpg class="related"><h3 class="m-3"></h3></a></div>'
            })
        }
    });

    showComments()

    form.onsubmit = (e) => {
        e.preventDefault()
        let score
        let texto
        let date = new Date();
        let mes = cero(date.getMonth() + 1);
        let dia = cero(date.getDay());
        let fecha = date.getFullYear() + "-" + mes + "-"+dia+" " + date.toLocaleTimeString()

        texto = formText.value

        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                // do whatever you want with the checked radio
                score = radios[i].value

                // only one radio can be logically checked, don't check the rest
                break;
            }
        }
        showComments({"score": score,
        "description": texto,
        "user": localStorage.getItem("user"),
        "dateTime": fecha});



    }
});


function showComments(newComent = null) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            obj = resultObj.data;
            if (!(newComent===null)) {
                obj.push(newComent)
            }
            obj.forEach(coment => {
                comentarios.innerHTML += '<div class=list-group-item><b>' + coment.user + '</b><span class="star">' + stars(coment.score) + '</span><p class="text-muted">' + coment.dateTime + '</p><p>"' + coment.description + '"</p></div>'
            })

        }
    });
}

function stars(score) {
    let html = "";
    for (let index = 0; index < 5; index++) {
        if (score > index) {
            html += '<span class="fa fa-star checked"></span>'
        } else {
            html += '<span class="fa fa-star"></span>'
        }
    }
    return html;

}

function cero(i) {
            if (i < 10) {
                i = '0' + i;
            }
            return i;
        }