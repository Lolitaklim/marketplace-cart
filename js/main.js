// аккордеон в наличии
const accordionBtn = document.querySelector('.hide-btn-instock');
const basketList = document.querySelector('.basket__list-instock');
basketList.style.maxHeight = basketList.scrollHeight + 'px';
const accordionChoose = document.querySelector('.accordion__choose');
const accordionHeader = document.querySelector('.accordion__header-hide');
accordionBtn.addEventListener('click', ()  => {
    accordionChoose.classList.toggle('accordion__choose_hidden');
    accordionHeader.classList.toggle('accordion__header-hide_hidden');
    accordionBtn.classList.toggle('hide-btn-flipped');
    basketList.classList.toggle('basket__list_overflow');
    if(basketList.style.maxHeight) {
        basketList.style.maxHeight = null
    } else {
        basketList.style.maxHeight = basketList.scrollHeight + 'px'
    }
});

// тултипы поверх hidden
// const icon = document.querySelector('.icon-i');
// const tooltip = document.querySelector('.tooltip');
// icon.addEventListener('mouseover', function () {
//     tooltip.classList.remove('tooltip-hidden');
// });
// icon.addEventListener('mouseout', function () {
//     tooltip.classList.add('tooltip-hidden');
// });

// избранное у товаров
const hearths = document.querySelectorAll('.hearth');
hearths.forEach((hearth) => {
    hearth.addEventListener('click', () => {
        hearth.classList.toggle('hearth_active');
        hearth.classList.toggle('hearth');
    });
});

// удаление у отсутвующих
const deleteButtons = document.querySelectorAll('.solduot__list-item .solduot__delete');
deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const listItem = button.closest('.solduot__list-item');
        listItem.remove();
        updateTotalItems();
    });
});
function updateTotalItems() {
    const totalItemsElement = document.querySelector('.solduot__header span');
    const totalItems = document.querySelectorAll('.solduot__list-item').length;
    totalItemsElement.textContent = `Отсутствуют · ${totalItems} товара`;
    const basketSoldout = document.querySelector('.basket__soldout');
    if (!totalItems) {
        basketSoldout.classList.remove('display-block');
        basketSoldout.classList.add('display-none');
    }
}

// аккордеон отсутствующих
const accordionBtnSoldout = document.querySelector('.hide-btn-soldout');
const basketListSoldout = document.querySelector('.basket__list-soldout');
basketListSoldout.style.maxHeight = basketList.scrollHeight + 'px';
accordionBtnSoldout.addEventListener('click', () => {
    accordionBtnSoldout.classList.toggle('hide-btn-flipped');
    if(basketListSoldout.style.maxHeight) {
        basketListSoldout.style.maxHeight = null
    } else {
        basketListSoldout.style.maxHeight = basketListSoldout.scrollHeight + 'px'
    }
});

// выбор платежной карты
const selectButton = document.querySelector('.modal-pay__bottom-btn');
const paymentCardSystem = document.querySelector('.placing__payment__card-system img');
const cardNumberSidebar = document.querySelector('.sidebar-payment-card');
const cardNumberPayment = document.querySelector('.payment__card-number');
const paymentCardSystemSidebar = document.querySelector('.sidebar__payment__card-system img');
selectButton.addEventListener('click', () => {
    const selectedCard = document.querySelector('input[name="cards"]:checked');
    if (selectedCard) {
        const cardSystem = selectedCard.nextElementSibling.querySelector('.card-label img').getAttribute('src');
        const cardNumber = selectedCard.nextElementSibling.querySelector('.card-number').textContent;
        paymentCardSystem.setAttribute('src', cardSystem);
        paymentCardSystemSidebar.setAttribute('src', cardSystem);
        cardNumberSidebar.textContent = cardNumber;
        cardNumberPayment.textContent = cardNumber;
    } 
});

// форматирование пробелов
function formatNum(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function removeSpaces(str) {
    return str.replace(/\s/g, '');
}

// скрытие и открытие счетчика корзины
const cartCounter = document.querySelector('.cost');

function hideCartCounter () {
    cartCounter.classList.add('display-none');
}

function showCartCounter () {
    cartCounter.classList.remove('display-none');
}


// чекбоксы товаров
const mainCheckbox = document.getElementById('checkbox-choose');
const subCheckboxes = document.querySelectorAll('.checkbox-item');
const costHeader = document.querySelector('.cost-header-number');
const costHeaderNoSale = document.querySelector('.cost-no-sale');
const costHeaderSale = document.querySelector('.cost-sale');
mainCheckbox.addEventListener('change', () => {
    if (mainCheckbox.checked) {
        subCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        let totalCost = 0;
        const itemGoods = document.querySelectorAll('[data-item]');
        itemGoods.forEach(itemGood => {
            const priceDig = itemGood.querySelector('.price-new__digit');
            totalCost += parseInt(removeSpaces(priceDig.textContent));
        })
        showCartCounter ();
        costHeader.textContent = formatNum(totalCost) + ' ';
        costHeaderNoSale.textContent = formatNum(Math.floor(totalCost * 1.9)) + ' сом';
        costHeaderSale.textContent = '−' + formatNum(Math.floor(totalCost * 0.1)) + ' сом';
        if(!totalCost) {
            hideCartCounter ();
        }            
    } else {
        subCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        hideCartCounter ();
    }
});
subCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const allChecked = Array.from(subCheckboxes).every(checkbox => checkbox.checked);
        mainCheckbox.checked = allChecked;
    });
});

// чекбокс списать оплату сразу
const checkboxPay = document.getElementById('checkbox-pay');
const submitButton = document.getElementById('submit-button');
const costHeaderRight = document.querySelector('.cost-header-number');
const paymentTextSidebar = document.querySelector('.sidebar-payment-description');
const paymentTextPlacing = document.querySelector('.payment__description');
checkboxPay.addEventListener('change', () => {
    const isChecked = checkboxPay.checked;
    paymentTextSidebar.classList.toggle('display-none', isChecked);
    paymentTextPlacing.classList.toggle('display-none', isChecked);
    submitButton.textContent = isChecked ? 'Оплатить ' + costHeaderRight.textContent + 'сом' : 'Заказать'; 
});

// удаление в модалке
const deleteBtn = document.querySelectorAll('.tab-item-courrier .delete');
deleteBtn.forEach((button) => {
    button.addEventListener('click', () => {
        const listItem = button.closest('.tab-item-courrier');
        listItem.remove();
        updateTotalItems();
    });
});

// выбор пункта выдачи
const selectBtn = document.querySelector('.select-point');
const pointAddrSidebar = document.querySelector('.point__addr-sidebar');
const pointAddr = document.querySelector('.point__addr');
selectBtn.addEventListener('click', () => {
    const selectedPoint = document.querySelector('input[name="tab-point"]:checked');
    if (selectedPoint) {
        const cardNumber = selectedPoint.nextElementSibling.querySelector('.tab-point-select').textContent;
        pointAddrSidebar.textContent = cardNumber;
        pointAddr.textContent = cardNumber;
    } 
});


// перенос слов с дефисами на новою строку в названиях товаров
window.addEventListener("load", preventHyphenation);
function preventHyphenation() {
    const elements = document.getElementsByClassName("goods-info__title");
    const elementsArray = Array.from(elements);
    elementsArray.forEach(element => {
        element.innerHTML = element.innerHTML.replace(/(\w+)-(\w+)/g, "<span class=\"nowrap\">$1-$2</span>");
    });
}
