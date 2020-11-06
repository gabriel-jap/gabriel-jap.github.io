const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var Categories = [];
var SortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

document.addEventListener("DOMContentLoaded", function () {
    const rangeFilterMin = document.getElementById("rangeFilterCountMin");
    const rangeFilterMax = document.getElementById("rangeFilterCountMax");

    function showCategoriesList() {
        let htmlContentToAppend = "";
        for (let i = 0; i < Categories.length; i++) {
            let category = Categories[i];
            if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
                ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))) {
                htmlContentToAppend += `
                    <div class="col-md-4">
                        <a href="products.html" class="card mb-4 shadow-sm custom-card">
                        <img class="bd-placeholder-img card-img-top" src="` + category.imgSrc + `" title="` + category.productCount + ` articulos" >
                        <h3 class="m-3">`+ category.name + `</h3>
                        <div class="card-body">
                            <p class="card-text">` + category.description + `</p>
                        </div>
                        </a>
                    </div>
                    `
            }
            document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        }
    }

    function sortAndShowCategories(newSort, newCategories) {
        SortCriteria = newSort;
        if (newCategories != undefined) {
            Categories = newCategories;
        }
        Categories = sortArrays(SortCriteria, Categories);
        showCategoriesList();
    }

    getJSONData(CATEGORIES_URL).then(function (resultObj) {
        try {
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        } catch (error) {
            alert("Ha ocurrido un error")
            console.log(error)
        }
    });

    document.getElementById("sortAsc").onclick = () => sortAndShowCategories(ORDER_ASC_BY_NAME);
    document.getElementById("sortDesc").onclick = () => sortAndShowCategories(ORDER_DESC_BY_NAME);
    document.getElementById("sortByCount").onclick = () => sortAndShowCategories(ORDER_BY_PROD_COUNT);
    document.getElementById("clearRangeFilter").onclick = () => {
        rangeFilterMin.value = "";
        rangeFilterMax.value = "";
        minCount = undefined;
        maxCount = undefined;
        showCategoriesList();
    };
    document.getElementById("rangeFilterCount").onclick = () => {
        minCount = rangeFilterMin.value;
        maxCount = rangeFilterMax.value;

        minCount = (minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0 ? parseInt(minCount) : undefined;

        maxCount = (maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0 ? parseInt(maxCount) : undefined;

        showCategoriesList();
    }
});