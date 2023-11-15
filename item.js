
document.addEventListener("DOMContentLoaded", function() {
    const listContainer = document.querySelector('.basket__list-instock');
    const listItemTemplate = document.getElementById('list-item-template');


    const dataArr = [
        {  
            id: 1,
            img: '/img/content/Frame3853.png',
            price: 522,
            sale: 1051,
            title: 'Футболка UZcotton мужская',
            color: 'белый',
            size: 56,
            storage: 'Коледино WB',
            company: 'OOO Вайлдберриз',
            tooltip: 'OOO "ВАЙЛДБЕРРИЗ"',
            ogrn: '1067746062449',
            addr: '142181, Московская область, д Коледино, тер. Индустриальный Парк Коледино, д. 6 стр. 1',
            count: 1,
            reminder: 3,
        },
        { 
            id: 2,
            img: '/img/content/277132129.png',
            price: '2 100 047',
            sale: '2 300 047',
            title: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
            color: 'прозрачный',
            size: null,
            storage: 'Коледино WB',
            company: 'OOO Мегапрофстиль',
            tooltip: 'OOO «МЕГАПРОФСТИЛЬ»',
            ogrn: '5167746237148',
            addr: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
            count: 200,
            reminder: 203,
        },
        { 
            id: 3,
            img: '/img/content/faber.png',
            price: 494,
            sale: 950,
            title: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
            color: null,
            size: null,
            storage: 'Коледино WB',
            company: 'OOO Вайлдберриз',
            tooltip: 'OOO "ВАЙЛДБЕРРИЗ"',
            ogrn: '1067746062449',
            addr: '142181, Московская область, д Коледино, тер. Индустриальный Парк Коледино, д. 6 стр. 1',
            count: 2,
            reminder: 4,
        }
    ];

    for (let i = 0; i < dataArr.length; i++) {
        const listItemClone = document.importNode(listItemTemplate.content, true);


        const checkboxInput = listItemClone.querySelector('.checkbox-label');
        checkboxInput.id = dataArr[i].id;

        const checkboxLabel = listItemClone.querySelector('.label-checkbox');
        checkboxLabel.for = dataArr[i].id;

        const imgElement = listItemClone.querySelector('.content-img');
        imgElement.src = dataArr[i].img;

        const priceElements = listItemClone.querySelectorAll('.price-new__digit');
        priceElements.forEach((priceElement) => {
            priceElement.textContent = dataArr[i].price;
            if (dataArr[i].price.length > 5) {
                priceElement.classList.add('price-new__digit_mini');
            }
        });

        const saleElements = listItemClone.querySelectorAll('.price-sale-count');
        saleElements.forEach((saleElement) => {
            saleElement.textContent = dataArr[i].sale;
        });

        const titleElement = listItemClone.querySelector('.goods-info__title');
        titleElement.textContent = dataArr[i].title;

        const colorElement = listItemClone.querySelector('.color');
        if (dataArr[i].color === null) {
            colorElement.classList.add('display-none');
        } else {
            colorElement.textContent = 'Цвет: ' + dataArr[i].color;
        }

        const sizeElement = listItemClone.querySelector('.good-size');
        if (dataArr[i].size === null) {
            sizeElement.classList.add('display-none');
        } else {
            sizeElement.textContent = 'Размер: ' + dataArr[i].size;
        }

        const propertiesElement = listItemClone.querySelector('.goods-info__properties');
        if (dataArr[i].size === null && dataArr[i].color === null) {
            propertiesElement.classList.add('display-none');
        }

        const storageElement = listItemClone.querySelector('.storage');
        storageElement.textContent = dataArr[i].storage;

        const companyElement = listItemClone.querySelector('.comstore__company-name');
        companyElement.textContent = dataArr[i].company;
        
        const tooltipElement = listItemClone.querySelector('.tooltip-name');
        tooltipElement.textContent = dataArr[i].tooltip;
       
        const ogrnElement = listItemClone.querySelector('.ogrn');
        ogrnElement.textContent = dataArr[i].ogrn;
        
        const addrElement = listItemClone.querySelector('.addr');
        addrElement.textContent = dataArr[i].addr;

        const countElement = listItemClone.querySelector('.counter__input');
        countElement.value = dataArr[i].count;

        const reminderElement = listItemClone.querySelector('.count-cood');
        reminderElement.textContent = dataArr[i].reminder;
    


        
        listContainer.appendChild(listItemClone);
    }

});