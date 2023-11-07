// перенос слов с дефисами на новою строку в названиях товаров
function preventHyphenation() {
    const elements = document.getElementsByClassName("in-stock-item-content-description-text");
    const elementsArray = Array.from(elements);
    elementsArray.forEach(element => {
        element.innerHTML = element.innerHTML.replace(/(\w+)-(\w+)/g, "<span class=\"nowrap\">$1-$2</span>");
    });
}

window.addEventListener("load", preventHyphenation);

