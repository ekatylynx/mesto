const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', _closeByOverlayClick);
    document.addEventListener('keyup', _closeByEscape);

    const btnCloses = popup.querySelector('.popup__btn-close');
    btnCloses.addEventListener('click', () => {
        closePopup(popup);
    });
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', _closeByOverlayClick);
    document.removeEventListener('keyup', _closeByEscape);
};

const _closeByEscape = (event) => { 
    if (event.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
};

const _closeByOverlayClick = (event) => {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target);
    }
};

export { openPopup, closePopup };
