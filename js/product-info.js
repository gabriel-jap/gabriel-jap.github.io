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
let obj
let rel
let comments

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;
            showComments()
        }
    });

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

            getJSONData(PRODUCTS_URL).then(function (resultObj) {
                if (resultObj.status === "ok")
                    rel = resultObj.data;
                console.log(obj)
                obj.relatedProducts.forEach(element => {
                    showRelated(rel[element])
                });

            });

        }
    });




    form.onsubmit = (e) => {
        e.preventDefault()
        let score
        let texto = formText.value
        let date = new Date();
        let mes = cero(date.getMonth() + 1);
        let dia = cero(date.getDay());
        let fecha = date.getFullYear() + "-" + mes + "-" + dia + " " + date.toLocaleTimeString() // fecha con formato

        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                // obtiene valor del radio seleccionado
                score = radios[i].value

                // solo habrá un radio selecionado
                break;
            }
        }
        //creo la estructura del comentario y la envio a la función
        showComments({
            "score": score,
            "description": texto,
            "user": localStorage.getItem("user"),
            "dateTime": fecha
        });
    }
});

function showComments(newComent = null) {
    if (!(newComent === null)) {//Si el parametro esta definido, agrega un comentario
        comments.push(newComent)
    }
    comentarios.innerHTML = "";//limpia los antiguos comentarios
    comments.forEach(coment => {
        comentarios.innerHTML += '<div class=list-group-item><b>' + coment.user + '</b><span class="star">' + stars(coment.score) + '</span><p class="text-muted">' + coment.dateTime + '</p><p>"' + coment.description + '"</p></div>'
    })//Dibuja todos los comentarios
}

function stars(score) {
    let html = "";
    for (let index = 0; index < 5; index++) {
        if (score > index) { // Genera tantas estrllas como puntuacion tenga el articulo, luego rellena con estrellas vaias hasta llegar a 5
            html += '<span class="fa fa-star checked"></span>'
        } else {
            html += '<span class="fa fa-star"></span>'
        }
    }
    return html;//Devuelve el codigo para generar

}

function cero(i) { //(Solo por formato) cambia la fecha en caso de que el mes o el día al formato mm o dd
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

function showRelated(element) {
    relacionados.innerHTML += `
    <div class="col-md-4">
    <a class="card mb-4 shadow-sm custom-card">
    <img src=` + element.imgSrc + ` class="related" title="` + element.description + `"><h3 class="m-3">` + element.name + `
    </h3></a>
    </div>
             `
}