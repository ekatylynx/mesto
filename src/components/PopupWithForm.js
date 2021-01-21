import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup-form');
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
        this._submitCallback(this._getInputValues());
        this.close();
    }

    setEventListeners() {
        this._form.addEventListener('submit', this._submit.bind(this));      
        super.setEventListeners();
    }

    close() {
        this._form.removeEventListener('submit', this._submit.bind(this));
        this._form.reset();
        const submitButton = this._form.querySelector('.popup-form__btn-submit');
        submitButton.classList.add('popup-form__btn-submit_invalid');
        submitButton.disabled = true;
        super.close();
    }
}