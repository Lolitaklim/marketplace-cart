const nameInput = document.getElementById('name');
const lastnameInput = document.getElementById('lastname');
const emailInput = document.getElementById('email');
const innInput = document.getElementById('inn');
const telInput = document.getElementById('tel');

const inputs = document.querySelectorAll('.userdata__input');

inputs.forEach((input) => {
    const labelTop = input.previousElementSibling;
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            labelTop.classList.remove('display-none');
            labelTop.classList.add('display-block');
        } else {
            labelTop.classList.remove('display-block');
            labelTop.classList.add('display-none');
        }
    });
});

telInput.addEventListener('blur', () => {
    validateTel();
});

telInput.addEventListener('input', () => {
    if (telInput.classList.contains('error')) {
        validateTel(); 
    } else {
        clearError(telInput,'telbottom');
    }
});

telInput.addEventListener('input', (event) => {
    let inputValue = event.target.value.replace(/\D/g, '');
    if (inputValue.length > 0) {
        inputValue = '+' + inputValue.substring(0, 1) + ' ' + inputValue.substring(1, 4) + ' ' + inputValue.substring(4, 7) + ' ' + inputValue.substring(7, 9) + ' ' + inputValue.substring(9, 11);
    }

    event.target.value = inputValue;
});

innInput.addEventListener('blur', () => {
    validateInn();
});

innInput.addEventListener('input', () => {
    if (innInput.classList.contains('error')) {
        validateInn(); 
    } else {
        clearError(innInput,'innbottom');
        clearErrorInn('innbottom');
    }
});

emailInput.addEventListener('blur', () => {
    validateEmail();
});

emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
        validateEmail(); 
    } else {
        clearError(emailInput,'emailbottom');
    }
});

nameInput.addEventListener('blur', () => {
    validateName();
});

nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('error')) {
        validateName(); 
    } else {
        clearError(nameInput,'namebottom');
    }
});

lastnameInput.addEventListener('blur', () => {
    validateLastame();
});

lastnameInput.addEventListener('input', () => {
    if (lastnameInput.classList.contains('error')) {
        validateLastame(); 
    } else {
        clearError(lastnameInput,'lastnamebottom');
    }
});

submitButton.addEventListener('click', (event) => {
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
    input.classList.add('orange');
    errorLabel.textContent = message;
    input.classList.add('orange-border');
    input.classList.add('error');

}

function clearError(input, errorLabelId) {
    const errorLabel = document.getElementById(errorLabelId);
    input.classList.remove('orange');
    errorLabel.textContent = '';
    input.classList.remove('orange-border');
    input.classList.remove('error');
}

function showErrorInn(errorLabelId) {
    const errorLabel = document.getElementById(errorLabelId);
    errorLabel.classList.add('orange');
}

function clearErrorInn(errorLabelId) {
    const errorLabel = document.getElementById(errorLabelId);
    errorLabel.classList.remove('orange');
}

function isFormValid() {
    return !nameInput.classList.contains('error') &&
    !lastnameInput.classList.contains('error') &&
    !emailInput.classList.contains('error') &&
    !innInput.classList.contains('error') &&
    !telInput.classList.contains('error');
}
