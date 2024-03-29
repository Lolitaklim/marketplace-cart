function formatNum(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function removeSpaces(str) {
    return str.replace(/\s/g, '');
}

const itemGoods = document.querySelectorAll('[data-item]');
itemGoods.forEach(itemGood => {

    // каунтер
    const countCood = itemGood.querySelector('.count-cood');
    const remainderAlert = itemGood.querySelector('.remainder-alert');
    const plusButton = itemGood.querySelector('.counter__sign_plus');
    const minusButton = itemGood.querySelector('.counter__sign_minus');
    const input = itemGood.querySelector('.counter__input');
    const remainingQuantity = parseInt(countCood.textContent) - input.value;
    if (parseInt(input.value) <= 1) {
        minusButton.classList.add('counter__sign_disabled');
    }
    if (remainingQuantity <= 2) {
        remainderAlert.classList.remove('remainder-alert_hidden');
        remainderAlert.textContent = `Осталось ${remainingQuantity} шт.`;
        if (remainingQuantity == 0) {
            plusButton.classList.add('counter__sign_disabled');
        }
    } 

    // вывод цены товара
    const priceDigits = itemGood.querySelectorAll('.price-new__digit');
    const priceSale = itemGood.querySelectorAll('.price-sale-count');
    const totalPrice = parseInt(removeSpaces(priceDigits[0].textContent));
    const inputValue1 = parseInt(input.value);          
    const initialPrice = totalPrice / inputValue1;
        
    itemGood.addEventListener('click', e => {
        
        const target = e.target;

        if (target.classList.contains('delete')) {
            const listItem = itemGood.closest('.list-item-instock');
            if (listItem) {
                listItem.remove();
            }
        }

        // счетчик
        let value = parseInt(input.value);
        if (target.classList.contains('counter__sign_plus') && !plusButton.classList.contains('counter__sign_disabled')) {
            value++;
        } else if (target.classList.contains('counter__sign_minus') && !minusButton.classList.contains('counter__sign_disabled')) {
            value--;
        } 
        if (value <= 1) {
            minusButton.classList.add('counter__sign_disabled');
        } else {
            minusButton.classList.remove('counter__sign_disabled');
        }
        const remainingQuantity = parseInt(countCood.textContent) - value;
        if (remainingQuantity <= 2) {
            remainderAlert.classList.remove('remainder-alert_hidden');
            remainderAlert.textContent = `Осталось ${remainingQuantity} шт.`;
            if (remainingQuantity == 0) {
                plusButton.classList.add('counter__sign_disabled');
            }else {
                plusButton.classList.remove('counter__sign_disabled');
            }
        } else {
            remainderAlert.classList.add('remainder-alert_hidden');
        }
        input.value = value;

        // вывод цены товара
        const totalPriceNew = value * initialPrice;
        const totalPriceSale = totalPriceNew * 1.5;

        priceDigits.forEach((priceDigit) => {
            priceDigit.textContent = formatNum(Math.floor(totalPriceNew));
        });
        priceSale.forEach((priceSal) => {
            priceSal.textContent = formatNum(Math.floor(totalPriceSale));
        });

        // общая цена
        let totalCost = 0;
        let amountAll = 0;
        let amount = 0;
        const itemGoods = document.querySelectorAll('[data-item]');
        itemGoods.forEach(itemGood => {
            const inputamountAll = itemGood.querySelector('.counter__input');
            amountAll = amountAll + parseInt(inputamountAll.value);
            amount++;
            const checkbox = itemGood.querySelector('.checkbox-item');
            const isChecked = checkbox.checked;
            if (isChecked) {
                const priceDig = itemGood.querySelector('.price-new__digit');
                totalCost += parseInt(removeSpaces(priceDig.textContent));
            } 
        })
        showCartCounter ();
        costHeader.textContent = formatNum(totalCost) + ' ';
        costHeaderNoSale.textContent = formatNum(Math.floor(totalCost * 1.9)) + ' сом';
        costHeaderSale.textContent = '−' + formatNum(Math.floor(totalCost * 0.1)) + ' сом';
        if(!totalCost) {
            hideCartCounter ();
        }
        const amountAllCreate = document.querySelector('.amount-all');
        const labelBusket = document.querySelector('.basket-label');
        const labelTabbar = document.querySelector('.tabbar__label');

        amountAllCreate.textContent = amountAll + ' ';
        labelBusket.textContent = amount;
        labelTabbar.textContent = amount;

        // лейблы в доставке
        const label1 = document.getElementById('item-1');
        const label2 = document.getElementById('item-2');
        const label3 = document.getElementById('item-3'); 
        
        const idGood = itemGood.querySelector('.checkbox-label');
        const idGoodNum = idGood.id;
        if(idGoodNum == 'item1') {
            label1.textContent = value;
        }
        if(idGoodNum == 'item2') {
            let value2 = value -184;
                label2.textContent = value2;
        }
        if(idGoodNum == 'item3') {
            label3.textContent = value;
        }
        
    })
})
