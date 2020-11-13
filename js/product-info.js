let obj
let rel
let comments

document.addEventListener("DOMContentLoaded", function (e) {
    const titule = document.getElementById("productName")
    const desc = document.getElementById("productDesc")
    const cost = document.getElementById("productCost")
    const img = document.getElementById("gallery")
    const vend = document.getElementById("prodVend")
    const categories = document.getElementById("cat")
    const comentarios = document.getElementById("coments")
    const form = document.getElementById("form-comment")
    const formText = document.getElementById("comentario")
    const radios = document.getElementsByName("score")

    function showComments(newComent = null) {
        if (newComent !== null) {//Si el parametro esta definido, agrega un comentario
            comments.push(newComent)
        }
        comentarios.innerHTML = "";//limpia los antiguos comentarios
        comments.forEach(coment => {
            comentarios.innerHTML += '<div class=list-group-item><b>' + coment.user + '</b><span class="star">' + stars(coment.score) + '</span><p class="text-muted">' + coment.dateTime + '</p><p>"' + coment.description + '"</p></div>'
        })//Dibuja todos los comentarios
    }
    function stars(score) {
        let html  = "";
        for (let index = 0; index < 5; index++) {
            // Genera tantas estrllas como puntuacion tenga el articulo, luego rellena con estrellas vaias hasta llegar a 5
            html += score > index ? '<span class="fa fa-star checked"></span>' : '<span class="fa fa-star"></span>'
        }
        return html;//Devuelve el codigo para generar

    }

    //(Solo por formato) cambia la fecha en caso de que el mes o el día al formato mm o dd
    function cero(i) { return i < 10 ? '0' + i : i }

    form.onsubmit = (event) => {
        event.preventDefault()
        let score
        let texto = formText.value
        let date = new Date();
        // fecha con formato
        let fecha = date.getFullYear() + "-" + cero(date.getMonth() + 1) + "-" + cero(date.getDay()) + " " + date.toLocaleTimeString()
        // obtiene valor del radio seleccionado
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) { score = radios[i].value }
        }
        //creo la estructura del comentario y la envio a la función
        showComments({
            "score": score,
            "description": texto,
            "user": "Yo",
            "dateTime": fecha
        });
    }

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        comments = resultObj.data;
        showComments()
    });

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        obj = resultObj.data;

        titule.innerText = obj.name;//Titulo (nombre del articulo)
        desc.innerHTML = obj.description;//Descripscion
        cost.innerHTML = obj.cost + " " + obj.currency;//Monto y tipo de cambio
        vend.innerText = obj.soldCount + " articulos vendidos";//relevancia (numero de vendidos)
        categories.innerHTML = obj.category + "→" //ruta (categoria)
        obj.images.forEach(element => {//mostrar la galeria
            img.innerHTML += '<span class="carousel-item"><img class="d-block w-100" src="' + element + '"></span>'
        });
        document.getElementsByTagName("span")[0].setAttribute("class", "carousel-item active") //quien empieza la galeria

        getJSONData(PRODUCTS_URL).then(function (object) {
            rel = object.data;
            obj.relatedProducts.forEach(element => {//por cada elemento mencionado como relacionado en el JSON
                document.getElementById("related").innerHTML += `
                <div class="col-md-4">
                    <a href="products.html" class="card mb-4 shadow-sm custom-card">
                    <img class="bd-placeholder-img card-img-top" src="` + rel[element].imgSrc + `">
                    <h3 class="m-3">`+ rel[element].name + `</h3>
                    <div class="card-body">
                        <p class="card-text">` + rel[element].description + `</p>
                    </div>
                    </a>
                </div>
                `});
        });
    });
});



