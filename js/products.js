const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
const ORDER_DESC_BY_PRICE = "9-1";
const ORDER_ASC_BY_PRICE = "1-9";
const ORDER_BY_PROD_VEND = "relevancia";


var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var fulllist = []
var buscador = document.getElementById("schname")

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

            htmlContentToAppend += `
                <div class="col-md-4">
                    <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                    <img class="bd-placeholder-img card-img-top" src="` + product.imgSrc + `">
                    <h3 class="m-3">`+ product.name + `</h3>
                    <h5 class="m-3">`+ product.cost + ` USD</h5>
                    <div class="card-body">
                        <p class="card-text">` + product.description + `</p>
                    </div>
                    </a>
                </div>
                `


            // htmlContentToAppend += `
            //  <a href="product-info.html" class="list-group-item list-group-item-action">
            //      <div class="row">
            //          <div class="col-3">
            //              <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
            //          </div>
            //          <div class="col">
            //              <div class="d-flex w-100 justify-content-between">
            //                  <h4 class="mb-1">`+ product.name + `</h4>
            //                  <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
            //              </div>
            //              <p class="mb-1">` + product.description + `</p>
            //              <b>Precio:`+ product.cost + `</b>
            //          </div>
            //      </div>
            //  </a>
            //  `



        }


    } document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
}

function sortAndShowProducts(sortCriteria, ProductsArray) {
    if (sortCriteria != undefined) {
        currentSortCriteria = sortCriteria;
    }

    if (ProductsArray != undefined) {
        currentProductsArray = ProductsArray;
    }

    currentProductsArray = sortArrays(currentSortCriteria, currentProductsArray);
    showProductsList();
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            fulllist = resultObj.data;
            sortAndShowProducts(ORDER_ASC_BY_PRICE, fulllist);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByRel").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_VEND);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {

        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList();
    });

    buscador.addEventListener("keyup", function () {
        let searchtext = buscador.value
        if (searchtext === "") {
            sortAndShowProducts(undefined, fulllist);
        } else {
            let filtrado = fulllist.filter(ele => ele.name.toLowerCase().includes(searchtext.toLowerCase()) || ele.description.includes(searchtext.toLowerCase()));

            sortAndShowProducts(undefined, filtrado)


        }
    })
    buscador.addEventListener("search", function (event) {
        sortAndShowProducts(undefined, fulllist)
    })
});

