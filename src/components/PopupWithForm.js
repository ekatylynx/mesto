import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup-form');
        this._submitButton = this._form.querySelector('.popup-form__btn-submit');
        this._buttonText = this._submitButton.textContent;
    }
    
    _getInputValues() {
        const inputsList = this._form.querySelectorAll('.popup-form__input');
        const formValues = {};

        inputsList.forEach((input) => {
            formValues[input.name] = input.value;
        });

        return formValues;
    }

    _submit(event) {
        event.preventDefault();
        this._submitButton.textContent = "Сохранение...";
        this._submitButton.disabled = true;
        this._submitCallback(this._getInputValues(), this.close.bind(this));
    }

    setEventListeners() {
        this._form.addEventListener('submit', this._submit.bind(this));      
        super.setEventListeners();
    }

    close() {
        this._form.removeEventListener('submit', this._submit.bind(this));
        this._form.reset();
        this._submitButton.textContent = this._buttonText;
        if (this._form.classList.contains('validated')) {
            this._submitButton.classList.add('popup-form__btn-submit_invalid');
            this._submitButton.disabled = true;
        } else {
            this._submitButton.disabled = false;
        }
        super.close();
    }
}