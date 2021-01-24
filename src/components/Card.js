class Card {
    constructor(id, name, link, likes, api, userId, ownerId, onRemove, selector, handleCardClick) { // popup
        this._id = id;
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._api = api;
        this._userId = userId;
        this._ownerId = ownerId;
        this._onRemove = onRemove;
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
            if (event.target.classList.contains('photo-card__btn-like_active')) {
                this._api.unLikeCard(this._id)
                    .then(res => {
                        event.target.classList.toggle('photo-card__btn-like_active');
                        this._likes = res.likes.length;
                        element.querySelector('.photo-card__like-count').textContent = this._likes;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                this._api.likeCard(this._id)
                    .then(res => {
                        event.target.classList.toggle('photo-card__btn-like_active');
                        this._likes = res.likes;
                        element.querySelector('.photo-card__like-count').textContent = this._likes.length;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            
        }
        btnLike.addEventListener('click', toggleLike);

        // Удаляем айтем карточки из шаблона, при клике на btnTrash
        const btnTrash = element.querySelector('.photo-card__btn-remove');
        if (btnTrash) {
            btnTrash.addEventListener('click', this._onRemove);
        }
    }

    generateCard() {
        const element = this._getTemplate();
        element.id = this._id;
        const image = element.querySelector('.photo-card__image');
        
        image.src = this._link;
        image.alt = this._name;

        element.querySelector('.photo-card__title').textContent = this._name;
        element.querySelector('.photo-card__like-count').textContent = this._likes.length;

        // Проставляем лайк если он есть
        let isLiked = false;

        for (let i = 0; i < this._likes.length; i++) {
            if (this._likes[i]._id === this._userId) {
                isLiked = true;
            }
        }

        if (isLiked) {
            element.querySelector('.photo-card__btn-like').classList.add('photo-card__btn-like_active');
        }

        // Кнопка удаления
        if (this._userId !== this._ownerId) {
            element.querySelector('.photo-card__btn-remove').remove();
        }
        
        this._setEventListeners(element);

        return element;
    }
}

export default Card;
