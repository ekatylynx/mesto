import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor(popupSelector, submitCallback) {
        super(popupSelector);
		// this._text = data.text;
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup-form');
    }
    
    _getInputValues() {
        const inputsList = this._form.querySelectorAll('.popup-form__input');
        let formValues = {};

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
        super.close();
    }
}