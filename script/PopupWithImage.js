import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup-image__image');
        this._caption = this._popup.querySelector('.popup-image__caption');
    }
    
    open(items) {
        this._image.src = items.link;
        this._caption.textContent = items.name;
        this._image.alt = items.name;
        super.open();
    }
}