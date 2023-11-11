// перенос слов с дефисами на новою строку в названиях товаров
function preventHyphenation() {
    const elements = document.getElementsByClassName("goods-info__title");
    const elementsArray = Array.from(elements);
    elementsArray.forEach(element => {
        element.innerHTML = element.innerHTML.replace(/(\w+)-(\w+)/g, "<span class=\"nowrap\">$1-$2</span>");
    });
}

window.addEventListener("load", preventHyphenation);

