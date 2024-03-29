const listContainer = document.querySelector('.basket__list-instock');
const listItemTemplate = document.getElementById('list-item-template');

function setElementContent(container, selector, content) {
    const element = container.querySelector(selector);
    if (element) {
        element.textContent = content;
    }
}

for (const item of dataArr) {
    const { id, img, price, sale, title, color, size, storage, company, tooltip, ogrn, addr, count, reminder } = item;
    
    const listItemClone = document.importNode(listItemTemplate.content, true);

    const checkboxInput = listItemClone.querySelector('.checkbox-label');
    checkboxInput.id = id;
    checkboxInput.value = id;

    const checkboxLabel = listItemClone.querySelector('.label-checkbox');
    checkboxLabel.setAttribute('for', id);

    const imgElement = listItemClone.querySelector('.content-img');
    imgElement.src = img;

    const priceElements = listItemClone.querySelectorAll('.price-new__digit');
    priceElements.forEach((priceElement) => {
        priceElement.textContent = price;
        if (price.length > 5) {
            priceElement.classList.add('price-new__digit_mini');
        }
    });

    const saleElements = listItemClone.querySelectorAll('.price-sale-count');
    saleElements.forEach((saleElement) => {
        saleElement.textContent = sale;
    });

    const titleElement = listItemClone.querySelector('.goods-info__title');
    titleElement.textContent = title;

    setElementContent(listItemClone, '.color', color ? 'Цвет: ' + color : null);
    setElementContent(listItemClone, '.good-size', size ? 'Размер: ' + size : null);

    const propertiesElement = listItemClone.querySelector('.goods-info__properties');
    if (size === null && color === null) {
        propertiesElement.classList.add('display-none');
    }

    setElementContent(listItemClone, '.storage', storage);
    setElementContent(listItemClone, '.comstore__company-name', company);
    setElementContent(listItemClone, '.tooltip-name', tooltip);
    setElementContent(listItemClone, '.ogrn', ogrn);
    setElementContent(listItemClone, '.addr', addr);
    setElementContent(listItemClone, '.count-cood', reminder);

    const countElement = listItemClone.querySelector('.counter__input');
    countElement.value = count;
    
    listContainer.appendChild(listItemClone);
}