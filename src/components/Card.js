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

    _setEventListeners(element) {
        const image = element.querySelector('.photo-card__image');

        image.addEventListener('click', this._handleCardClick);

        // В соответствии с требованиями 7-го спринта  все колбэки 
        // должны быть помещены в отдельные функции и передаваться как второй параметр в addEventListener

        // Меняем класс у лайка при нажатии
        const btnLike = element.querySelector('.photo-card__btn-like');
        const toggleLike = (event) => {
            event.target.classList.toggle('photo-card__btn-like_active');
        }
        btnLike.addEventListener('click', toggleLike);

        // Удаляем айтем карточки из шаблона, при клике на btnTrash
        const btnTrash = element.querySelector('.photo-card__btn-remove');
        const deleteCard = (event) => {
            document.querySelector(".photogallery__wrapper").removeChild(element);
        }
        btnTrash.addEventListener('click', deleteCard);
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
