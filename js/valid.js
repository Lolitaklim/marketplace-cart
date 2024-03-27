const nameInput = document.getElementById('name');
const lastnameInput = document.getElementById('lastname');
const emailInput = document.getElementById('email');
const innInput = document.getElementById('inn');
const telInput = document.getElementById('tel');

const inputs = document.querySelectorAll('.userdata__input');

inputs.forEach(function(input) {
    const labelTop = input.previousElementSibling;
    input.addEventListener('input', function () {
        if (input.value.trim() !== '') {
            labelTop.style.display = 'block';
        } else {
            labelTop.style.display = 'none';
        }
    });
});

telInput.addEventListener('blur', function () {
    validateTel();
});
telInput.addEventListener('input', function () {
    if (telInput.classList.contains('error')) {
        validateTel(); 
    } else {
        clearError(telInput,'telbottom');
    }
});

telInput.addEventListener('input', function (event) {
    let inputValue = event.target.value.replace(/\D/g, '');
    if (inputValue.length > 0) {
        inputValue = '+' + inputValue.substring(0, 1) + ' ' + inputValue.substring(1, 4) + ' ' + inputValue.substring(4, 7) + ' ' + inputValue.substring(7, 9) + ' ' + inputValue.substring(9, 11);
    }

    event.target.value = inputValue;
});

innInput.addEventListener('blur', function () {
    validateInn();
});
innInput.addEventListener('input', function () {
    if (innInput.classList.contains('error')) {
        validateInn(); 
    } else {
        clearError(innInput,'innbottom');
        clearErrorInn('innbottom');
    }
});

emailInput.addEventListener('blur', function () {
    validateEmail();
});
emailInput.addEventListener('input', function () {
    if (emailInput.classList.contains('error')) {
        validateEmail(); 
    } else {
        clearError(emailInput,'emailbottom');
    }
});

nameInput.addEventListener('blur', function () {
    validateName();
});
nameInput.addEventListener('input', function () {
    if (nameInput.classList.contains('error')) {
        validateName(); 
    } else {
        clearError(nameInput,'namebottom');
    }
});

lastnameInput.addEventListener('blur', function () {
    validateLastame();
});
lastnameInput.addEventListener('input', function () {
    if (lastnameInput.classList.contains('error')) {
        validateLastame(); 
    } else {
        clearError(lastnameInput,'lastnamebottom');
    }
});

submitButton.addEventListener('click', function (event) {
    event.preventDefault(); 

    validateNameSend();
    validateLastameSend();
    validateEmailSend();
    validateInnSend();
    validateTelSend();
    
    if (!isFormValid()) {
        scrollToFirstError();
        return;
    }
    
});

function scrollToFirstError() {
    const errorFields = document.querySelectorAll('.userdata__input.error');
    if (errorFields.length > 0) {
        const errorField = errorFields[0];
        const yOffset = -50; 
        const y = errorField.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
}

function validateTel() {
    const telValue = telInput.value.trim();
    if (telValue === '') {
        clearError(telInput, 'telbottom');
        return;
    }
    const cleanedPhone = telValue.replace(/\D/g, '');
    const phoneRegex = /^\d{1}\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/;
    if (!phoneRegex.test(cleanedPhone)) {
    
        showError(telInput,'telbottom','Формат: +9 999 999 99 99');
    } else {
        
        clearError(telInput,'telbottom');
    }
}
function validateTelSend() {
    const telValue = telInput.value.trim();
    if (telValue === '') {
        showError(telInput,'telbottom','Укажите номер телефона');
    } else {
        clearError(telInput,'telbottom');
        validateTel();
    }
}

function validateInn() {
    const innValue = innInput.value.trim();
    if (innValue === '') {
        clearErrorInn('innbottom');
        clearError(innInput, 'innbottom');
        return; 
    }
    const innRegex = /^\d{14}$/;
    if (!innRegex.test(innValue)) {
        showErrorInn('innbottom');
        showError(innInput,'innbottom','Проверьте ИНН');
    } else {
        clearErrorInn('innbottom');
        clearError(innInput,'innbottom');
    }
}
function validateInnSend() {
    const innValue = innInput.value.trim();
    if (innValue === '') {
        showErrorInn('innbottom');
        showError(innInput,'innbottom','Укажите ИНН');
    } else {
        clearErrorInn('innbottom');
        clearError(innInput,'innbottom');
        validateInn();
    }
}

function validateName() {
    const nameValue = nameInput.value.trim();
    if (nameValue.trim() !== '' && !/^[А-Яа-яЁё]+$/.test(nameValue)) {
        showError(nameInput,'namebottom','Укажите имя');
    } else {
        clearError(nameInput,'namebottom');
    }
}
function validateNameSend() {
    const nameValue = nameInput.value.trim();
    if (nameValue === '') {
        showError(nameInput,'namebottom','Укажите имя');
    } else {
        clearError(nameInput,'namebottom');
        validateName();
    }
}

function validateLastame() {
    const lastnameValue = lastnameInput.value.trim();
    if (lastnameValue.trim() !== '' && !/^[А-Яа-яЁё]+$/.test(lastnameValue)) {
        showError(lastnameInput,'lastnamebottom','Укажите фамилию');
    } else {
        clearError(lastnameInput,'lastnamebottom');
    }
}
function validateLastameSend() {
    const lastnameValue = lastnameInput.value.trim();
    if (lastnameValue === '') {
        showError(lastnameInput,'lastnamebottom','Укажите фамилию');
    } else {
        clearError(lastnameInput,'lastnamebottom');
        validateLastame();
    }
}

function validateEmail() {
    const emailValue = emailInput.value.trim();
    if (!isValidEmail(emailValue)) {
        showError(emailInput,'emailbottom','Проверьте адрес электронной почты');
    } else {
        clearError(emailInput,'emailbottom');
    }
}
function isValidEmail(email) {
    if (email.trim() === '') {
        return true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function validateEmailSend() {
    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
        showError(emailInput,'emailbottom','Укажите электронную почту');
    } else {
        clearError(emailInput,'emailbottom');
        validateEmail();
    }
}


function showError(input, errorLabelId, message) {
    const errorLabel = document.getElementById(errorLabelId);
    input.style.color = '#F55123';
    errorLabel.textContent = message;
    input.style.borderBottomColor = '#F55123';
    input.classList.add('error');

}

function clearError(input, errorLabelId) {
    const errorLabel = document.getElementById(errorLabelId);
    input.style.color = '';
    errorLabel.textContent = '';
    input.style.borderBottomColor = '';
    input.classList.remove('error');
}

function showErrorInn(errorLabelId) {
    const errorLabel = document.getElementById(errorLabelId);
    errorLabel.style.color = '#F55123';
}

function clearErrorInn(errorLabelId) {
    const errorLabel = document.getElementById(errorLabelId);
    errorLabel.style.color = '';
}

function isFormValid() {
    return !nameInput.classList.contains('error') &&
    !lastnameInput.classList.contains('error') &&
    !emailInput.classList.contains('error') &&
    !innInput.classList.contains('error') &&
    !telInput.classList.contains('error');
}
