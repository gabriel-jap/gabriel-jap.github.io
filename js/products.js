const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function showProductsList(){

     let htmlContentToAppend = "";
     for(let i = 0; i < currentProductsArray.length; i++){
         let product = currentProductsArray[i];

         if (((minCount == undefined) || (minCount != undefined && parseInt(product.productCount) >= minCount)) &&
             ((maxCount == undefined) || (maxCount != undefined && parseInt(product.productCount) <= maxCount))){

             htmlContentToAppend += `
             <a href="category-info.html" class="list-group-item list-group-item-action">
                 <div class="row">
                     <div class="col-3">
                         <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                     </div>
                     <div class="col">
                         <div class="d-flex w-100 justify-content-between">
                             <h4 class="mb-1">`+ product.name +`</h4>
                             <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                         </div>
                         <p class="mb-1">` + product.description + `</p>
                     </div>
                 </div>
             </a>
             `
         }

         document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
     }
}

function sortAndShowProducts(sortCriteria, ProductsArray){
    currentSortCriteria = sortCriteria;

    if(ProductsArray != undefined){
        currentProductsArray = ProductsArray;
    }

    currentProductsArray = sortArrays(currentSortCriteria, currentProductsArray);

    showProductsList();
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByRel").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_VEND);
    });
});