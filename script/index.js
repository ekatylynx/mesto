import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach((item, i) => {
    const card = new Card(item.name, item.link, "#photo-card", ".photogallery__wrapper");
    
    const cardElement = card.generateCard();
    card.addToEnd(cardElement);
});


// Редактировать Кусто
const btnEdit = document.querySelector('.profile-info__btn-edit');
const profileName = document.querySelector('.profile-info__name');
const profileAbout = document.querySelector('.profile-info__description');

const popupEdit = document.querySelector('.popup.popup-edit');
const popupEditForm = document.querySelector('.popup-edit .popup-form');
const popupEditName = document.querySelector('.popup-edit .popup-form__input_field_name');
const popupEditAbout = document.querySelector('.popup-edit .popup-form__input_field_description');

btnEdit.addEventListener('click', (event) => {
    popupEditName.value = profileName.textContent;
    popupEditAbout.value = profileAbout.textContent;

    openPopup(popupEdit);
});

popupEditForm.addEventListener('submit', (event) => {
    event.preventDefault();

    profileName.textContent = popupEditName.value;
    profileAbout.textContent = popupEditAbout.value;

    closePopup(popupEdit);
});

// Создать новую карточку
const btnAddCard = document.querySelector('.profile__btn-add');

const popupCreate = document.querySelector('.popup.popup-create');
const popupCreateForm = document.querySelector('.popup-create .popup-form');
const popupCreateName = document.querySelector('.popup-create .popup-form__input_field_name');
const popupCreateLink = document.querySelector('.popup-create .popup-form__input_field_description');

btnAddCard.addEventListener('click', function(event) {
    popupCreateForm.reset();
    openPopup(popupCreate);
});

popupCreateForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const card = new Card(
        popupCreateName.value,
        popupCreateLink.value,
        "#photo-card",
        ".photogallery__wrapper"
    );
    
    const cardElement = card.generateCard();
    card.addToStart(cardElement);

    closePopup(popupCreate);
});

// Валидация форм
const validationConfig = {
    inputSelector: '.popup-form__input',
    submitButtonSelector: '.popup-form__btn-submit',
    inputInvalidClass: '.popup-form__input_type_error',
    buttonInvalidClass: 'popup-form__btn-submit_invalid',
    errorClass: 'popup-form__input_type_invalid',
}

const formProfile = new FormValidator(validationConfig, ".popup-form-profile");
formProfile.enableValidate();

const formCard = new FormValidator(validationConfig, ".popup-form-card");
formCard.enableValidate();
