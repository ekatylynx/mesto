class Form {
    constructor(config, formSelector) {
        this._config = config;
        this._form = document.querySelector(formSelector);
    }

    _showInputError = (input) => {
        const formError = this._form.querySelector(`#${input.id}-error`);
        formError.textContent = input.validationMessage;
        input.classList.add(this._config.errorClass);
    }
    
    _hideInputError = (input) => {
        const formError = this._form.querySelector(`#${input.id}-error`);
        input.classList.remove(this._config.errorClass);
        formError.textContent = "";
    }
    
    _checkInputValidity = (input) => {
        if (!input.validity.valid) {
            // Если поле не проходит валидацию, покажем ошибку
            this._showInputError(input);
        } else {
            // Если проходит, скроем
            this._hideInputError(input);
        }
    }
    
    _setButtonState(button, isActive) {
        if (isActive) {
            button.classList.remove(this._config.buttonInvalidClass);
            button.disabled = false;
        } else {
            button.classList.add(this._config.buttonInvalidClass);
            button.disabled = true;
        }
    }
    
    _setEventListeners() {
        const inputsList = this._form.querySelectorAll(this._config.inputSelector);
        const submitButton = this._form.querySelector(this._config.submitButtonSelector);
    
        inputsList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._setButtonState(submitButton, this._form.checkValidity());
            });
        });
    }
    
    enableValidation() {
        this._setEventListeners();

        this._form.addEventListener('submit', (event) => {
            event.preventDefault()
        })

        const submitButton = this._form.querySelector(this._config.submitButtonSelector);
        this._setButtonState(submitButton, this._form.checkValidity());


        // Для невалидируемой формы PopupConfirm
        this._form.classList.add("validated");
    }
}

export default Form;
