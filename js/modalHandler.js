// модальные окна
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "flex";
    const overlay = document.getElementById("overlay");
    overlay.style.display = "flex";
}
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";
}

// добавление слушателя событий на кнопки модальных окон
function addButtonEventListener(buttonId, modalId) {
    const button = document.getElementById(buttonId);
    button.addEventListener("click", function() {
        openModal(modalId);
    });
}

function addCloseButtonEventListener(buttonId, modalId) {
    const button = document.getElementById(buttonId);
    button.addEventListener("click", function() {
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

openTab('tab1');

// таб
function openTab(tabId) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tabContent => {
        tabContent.style.display = 'none';
    });
    const selectedTab = document.getElementById(tabId);
    selectedTab.style.display = 'flex';
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('tab-active');
    });
    const activeTab = document.getElementById(`open${tabId}`);
    activeTab.classList.add('tab-active');
}

const openTab1 = document.getElementById("opentab1");
openTab1.addEventListener("click", function() {
    openTab("tab1");
});

const openTab2 = document.getElementById("opentab2");
openTab2.addEventListener("click", function() {
    openTab("tab2");
});