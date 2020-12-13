export default class FormValidator {
    constructor(settings, formSelector) {
        this._settings = settings;
        this._form = document.querySelector(formSelector);
    }
    // Функция изменения состояния кнопки
    _setButtonState() {
        const submitButton = this._form.querySelector(this._settings.submitButtonSelector);

        if (this._form.checkValidity()) {
            submitButton.classList.remove("popup-form__btn-submit_invalid");
            submitButton.disabled = false;
        } else {
            submitButton.classList.add("popup-form__btn-submit_invalid");
            submitButton.disabled = true;
        }
    }

    enableValidate() {
        const inputsList = this._form.querySelectorAll(this._settings.inputSelector);
        
        inputsList.forEach((input) => {
            input.addEventListener('input', () => {
                if (!input.validity.valid) {
                    // Если поле не проходит валидацию, покажем ошибку
                    const formError = this._form.querySelector(`#${input.id}-error`);
                    formError.textContent = input.validationMessage;
                    input.classList.add(this._settings.errorClass);
                } else {
                    // Если проходит, скроем
                    const formError = this._form.querySelector(`#${input.id}-error`);
                    input.classList.remove(this._settings.errorClass);
                    formError.textContent = "";
                }

                this._setButtonState();
            });
        });

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
        })

        this._setButtonState();
    }
}