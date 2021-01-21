class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._btnClose = this._popup.querySelector('.popup__btn-close');
        this._image = this._popup.querySelector('.popup-image__image');
    }

    open() {
        this._popup.classList.add('popup_opened');
        this._popup.addEventListener('click', this._handleOverlayClose);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        this._popup.removeEventListener('click', this._handleOverlayClose);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._btnClose.addEventListener('click', () => this.close());

        this._popup.addEventListener('click', (event) => {
            if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
              this.close();
            }
          });
    }

    _handleEscClose(event) { 
        if (event.key === 'Escape') {
            this.close();
        }
    }
    
    _handleOverlayClose(event) {
        if (event.target.classList.contains('popup')) {
            this.close();
        }
    }
}

export default Popup;