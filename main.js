
// перенос слов с дефисами на новою строку в названиях товаров
function preventHyphenation() {
    const elements = document.getElementsByClassName("goods-info__title");
    const elementsArray = Array.from(elements);
    elementsArray.forEach(element => {
        element.innerHTML = element.innerHTML.replace(/(\w+)-(\w+)/g, "<span class=\"nowrap\">$1-$2</span>");
    });
}

window.addEventListener("load", preventHyphenation);

document.addEventListener('DOMContentLoaded', function () {

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

    // тултипы поверх hidden
    document.addEventListener('DOMContentLoaded', function () {
        var icon = document.querySelector('.icon-i');
        var tooltip = document.querySelector('.tooltip');
        icon.addEventListener('mouseover', function () {
            tooltip.classList.remove('tooltip-hidden');
        });
        icon.addEventListener('mouseout', function () {
            tooltip.classList.add('tooltip-hidden');
        });
    });


    // идем по товарам
    const itemGoods = document.querySelectorAll('[data-item]');
   
        itemGoods.forEach(itemGood => {

            const countCood = itemGood.querySelector('.count-cood');
            const remainderAlert = itemGood.querySelector('.remainder-alert');
            const plusButton = itemGood.querySelector('.counter__sign_plus');
            const minusButton = itemGood.querySelector('.counter__sign_minus');
            const input = itemGood.querySelector('.counter__input');
            const remainingQuantity = parseInt(countCood.textContent) - input.value;

            if (parseInt(input.value) <= 1) {
                minusButton.classList.add('counter__sign_disabled');
            }

            console.log(remainingQuantity)
            if (remainingQuantity <= 2) {
                remainderAlert.classList.remove('remainder-alert_hidden');
                remainderAlert.textContent = `Осталось ${remainingQuantity} шт.`;
                if (remainingQuantity == 0) {
                    plusButton.classList.add('counter__sign_disabled');
                }
            } 
               
            itemGood.addEventListener('click', e => {
                const target = e.target;

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

            })
        })
    

});

