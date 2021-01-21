// import { openPopup } from './utils.js';

class Card {
    constructor(name, link, selector, handleCardClick) { // popup
        this._name = name;
        this._link = link;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._selector)
        .content
        .querySelector('.photo-card')
        .cloneNode(true);

        return cardElement;
    }

    // _openModal(name, link) {
    //     const popupImage = document.querySelector('.popup.popup-image');
    //     const popupOpenImage = document.querySelector('.popup-image__image');
    //     const popupCaption = document.querySelector('.popup-image__caption');

    //     popupOpenImage.src = link;
    //     popupCaption.textContent = name;
    //     openPopup(popupImage);
    //  }

    _setEventListeners(element) {
        const image = element.querySelector('.photo-card__image');

        image.addEventListener('click', this._handleCardClick);

        // image.addEventListener('click', () => {
        // //     this._openModal(this._name, this._link);
        //     this._popup.open({
        //         name: this._name,
        //         link: this._link,
        //     });
        // });

        const btnLike = element.querySelector('.photo-card__btn-like');

        // Меняем класс у лайка при нажатии
        btnLike.addEventListener('click', (event) => {
            event.target.classList.toggle('photo-card__btn-like_active');
        });

        const btnTrash = element.querySelector('.photo-card__btn-remove');

        // Удаляем айтем карточки из шаблона, при клике на btnTrash
        btnTrash.addEventListener('click', () => {
            document.querySelector(".photogallery__wrapper").removeChild(element);
        });
    }

    generateCard() {
        const element = this._getTemplate();
        const image = element.querySelector('.photo-card__image');
        
        image.src = this._link;
        image.alt = this._name;

        element.querySelector('.photo-card__title').textContent = this._name;

        this._setEventListeners(element);

        return element;
    }
}

export default Card;
