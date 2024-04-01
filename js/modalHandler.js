// модальные окна
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('display-block');
    const overlay = document.getElementById("overlay");
    overlay.classList.add('display-block');
}
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('display-block');
    const overlay = document.getElementById("overlay");
    overlay.classList.remove('display-block');
}

// добавление слушателя событий на кнопки модальных окон
function addButtonEventListener(buttonId, modalId) {
    const button = document.getElementById(buttonId);
    button.addEventListener("click", () => {
        openModal(modalId);
    });
}

function addCloseButtonEventListener(buttonId, modalId) {
    const button = document.getElementById(buttonId);
    button.addEventListener("click", () => {
        closeModal(modalId);
    });
}

addButtonEventListener("modalDeliveryPlacing", "modalDelivery");
addButtonEventListener("modalDeliverySidebar", "modalDelivery");
addCloseButtonEventListener("modalDeliveryCloseTop", "modalDelivery");
addCloseButtonEventListener("modalDeliveryCloseBottom", "modalDelivery");

addButtonEventListener("modalPayPlacing", "modalPay");
addButtonEventListener("modalPaySidebar", "modalPay");
addCloseButtonEventListener("modalPayCloseTop", "modalPay");
addCloseButtonEventListener("modalPayCloseBottom", "modalPay");

const radioBtnTab = document.querySelectorAll('.radio-btn-tab');

openTab('tab1');

// таб 
function openTab(tabId) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tabContent => {
        tabContent.classList.add('display-none');
        tabContent.classList.remove('display-flex');
    });
    const selectedTab = document.getElementById(tabId);
    selectedTab.classList.add('display-flex');
    selectedTab.classList.remove('display-none');

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('tab-active');
    });
    const activeTab = document.getElementById(`open${tabId}`);
    activeTab.classList.add('tab-active');
    
    radioBtnTab.forEach(function(button) {
        button.checked = false;
    });
}

const openTab1 = document.getElementById("opentab1");
openTab1.addEventListener("click", () => {
    openTab("tab1");
});

const openTab2 = document.getElementById("opentab2");
openTab2.addEventListener("click", () => {
    openTab("tab2");
});