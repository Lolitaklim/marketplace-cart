
// аккордеон в наличии
var accordionBtn = document.querySelector('.hide-btn-instock');
var basketList = document.querySelector('.basket__list-instock');
basketList.style.maxHeight = basketList.scrollHeight + 'px';
var accordionChoose = document.querySelector('.accordion__choose');
var accordionHeader = document.querySelector('.accordion__header-hide');
accordionBtn.addEventListener('click', function () {
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
var icon = document.querySelector('.icon-i');
var tooltip = document.querySelector('.tooltip');
icon.addEventListener('mouseover', function () {
    tooltip.classList.remove('tooltip-hidden');
});
icon.addEventListener('mouseout', function () {
    tooltip.classList.add('tooltip-hidden');
});


// удаление и избранное у отсутвующих
const deleteButtons = document.querySelectorAll('.solduot__list-item .solduot__delete');
deleteButtons.forEach(function (button) {
    button.addEventListener('click', function () {
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
    if (totalItems === 0) {
        basketSoldout.style.display = 'none';
    } else {
        basketSoldout.style.display = 'block';
    }
}

// чекбокс списать оплату сразу
const checkboxPay = document.getElementById('checkbox-pay');
const submitButton = document.getElementById('submit-button');
const costHeaderRight = document.querySelector('.cost-header-number');
const paymentTextSidebar = document.querySelector('.sidebar-payment-description');
const paymentTextPlacing = document.querySelector('.payment__description');
checkboxPay.addEventListener('change', function () {
    if (checkboxPay.checked) {
        paymentTextSidebar.style.display = 'none';
        paymentTextPlacing.style.display = 'none';
        submitButton.textContent = 'Оплатить ' + costHeaderRight.textContent + 'сом'; 
    } else {
        paymentTextSidebar.style.display = 'flex';
        paymentTextPlacing.style.display = 'flex';
        submitButton.textContent = 'Заказать'; 
    }
});

// аккордеон отсутствующих
var accordionBtnSoldout = document.querySelector('.hide-btn-soldout');
var basketListSoldout = document.querySelector('.basket__list-soldout');
basketListSoldout.style.maxHeight = basketList.scrollHeight + 'px';
accordionBtnSoldout.addEventListener('click', function () {
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
selectButton.addEventListener('click', function () {
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

// чекбоксы товаров
const mainCheckbox = document.getElementById('checkbox-choose');
const subCheckboxes = document.querySelectorAll('.checkbox-item');
const costHeader = document.querySelector('.cost-header-number');
const costHeaderNoSale = document.querySelector('.cost-no-sale');
const costHeaderSale = document.querySelector('.cost-sale');
mainCheckbox.addEventListener('change', function () {
    if (this.checked) {
        subCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        let totalCost = 0;
        const itemGoods = document.querySelectorAll('[data-item]');
        itemGoods.forEach(itemGood => {

            const check = itemGood.querySelector('.checkbox-item');
            const isChecked = check.checked;
            
            if (isChecked) {
                const priceDig = itemGood.querySelector('.price-new__digit');
                totalCost += parseInt(removeSpaces(priceDig.textContent));
            } 
        })
        costHeader.textContent = formatNum(totalCost) + ' ';
        costHeaderNoSale.textContent = formatNum(Math.floor(totalCost * 1.9)) + ' сом';

        if(totalCost != 0) {
        costHeaderSale.textContent = '−' + formatNum(Math.floor(totalCost * 0.1)) + ' сом';
        } else {
            costHeaderSale.textContent = formatNum(Math.floor(totalCost * 0.1)) + ' сом';
        }            
    } else {
        subCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });           
        costHeader.textContent = 0 + ' ';
        costHeaderNoSale.textContent = 0 + ' сом';
        costHeaderSale.textContent = 0 + ' сом';
    }
});
subCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const allChecked = Array.from(subCheckboxes).every(checkbox => checkbox.checked);
        mainCheckbox.checked = allChecked;
    });
});

// удаление в модалке
const deleteBtn = document.querySelectorAll('.tab-item-courrier .delete');
deleteBtn.forEach(function (button) {
    button.addEventListener('click', function () {
        const listItem = button.closest('.tab-item-courrier');
        listItem.remove();
        updateTotalItems();
    });
});

// выбор пункта выдачи
const selectBtn = document.querySelector('.select-point');
const pointAddrSidebar = document.querySelector('.point__addr-sidebar');
const pointAddr = document.querySelector('.point__addr');
selectBtn.addEventListener('click', function () {
    const selectedPoint = document.querySelector('input[name="tab-point"]:checked');
    if (selectedPoint) {
        const cardNumber = selectedPoint.nextElementSibling.querySelector('.tab-point-select').textContent;
        pointAddrSidebar.textContent = cardNumber;
        pointAddr.textContent = cardNumber;
    } 
});




window.addEventListener("load", preventHyphenation);

// перенос слов с дефисами на новою строку в названиях товаров
function preventHyphenation() {
    const elements = document.getElementsByClassName("goods-info__title");
    const elementsArray = Array.from(elements);
    elementsArray.forEach(element => {
        element.innerHTML = element.innerHTML.replace(/(\w+)-(\w+)/g, "<span class=\"nowrap\">$1-$2</span>");
    });
}
