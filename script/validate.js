const showInputError = (form, input, config) => {
    const formError = document.getElementById(`${input.id}-error`);
    formError.textContent = input.validationMessage;
    input.classList.add('popup-form__input_type_invalid');
}

const hideInputError = (form, input, config) => {
    const formError = document.getElementById(`${input.id}-error`);
    input.classList.remove('popup-form__input_type_invalid');
    formError.textContent = "";
}

const checkInputValidity = (form, input, config) => {
    if (!input.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        showInputError(form, input, config);
    } else {
        // Если проходит, скроем
        hideInputError(form, input, config);
    }
}

// formElements.forEach((popup) => {
//     const inputs = popup.querySelectorAll('.popup-form__input');

//     popups.forEach((input) => {
//         input.addEventListener('input', checkInputValidity);
//     });
// });

function setButtonState(button, isActive, config) {
    if (isActive) {
        button.classList.remove(config.buttonInvalidClass);
        button.disabled = false;
    } else {
        button.classList.add(config.buttonInvalidClass);
        button.disabled = true; 
    }
}

function setEventListeners(form, config) {
    const inputsList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputsList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input, config);
            setButtonState(submitButton, form.checkValidity(), config);
        });
    });
}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach((form) => {
        setEventListeners(form, config);

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            console.log('отправка формы');
        });

        const submitButton = form.querySelector(config.submitButtonSelector);
        setButtonState(submitButton, form.checkValidity(), config)
    });
}

// Создаем конфиг валидации 

const validationConfig = {
    formSelector: '.popup-form',
    inputSelector: '.popup-form__input',
    submitButtonSelector: '.popup-form__btn-submit',
    inputInvalidClass: '.popup-form__input_type_error',
    buttonInvalidClass: 'popup-form__btn-submit_invalid',
}

enableValidation(validationConfig);
