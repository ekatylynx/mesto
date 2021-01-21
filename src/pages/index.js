import "./index.css";

import Card from '../components/Card.js';
import Form from '../components/Form.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


const btnEdit = document.querySelector('.profile-info__btn-edit');

const popupEditName = document.querySelector('.popup-edit .popup-form__input_field_name');
const popupEditAbout = document.querySelector('.popup-edit .popup-form__input_field_description');
const btnAddCard = document.querySelector('.profile__btn-add');


// Конфиг для валидации
const validationConfig = {
    inputSelector: '.popup-form__input',
    submitButtonSelector: '.popup-form__btn-submit',
    inputInvalidClass: '.popup-form__input_type_error',
    buttonInvalidClass: 'popup-form__btn-submit_invalid',
    errorClass: 'popup-form__input_type_invalid',
}

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

// Экземпляр класса пользователя
const userInfos = new UserInfo({
    nameSelector: '.profile-info__name',
    aboutSelector: '.profile-info__description',
});

// Попап картинки
const popupImage = new PopupWithImage('.popup.popup-image');
popupImage.setEventListeners();

// Форма редактирования имени
const popupEdit = new PopupWithForm('.popup.popup-edit', (values) => {
    userInfos.setUserInfo(values['popup-form-name'], values['popup-form-about']);
});

popupEdit.setEventListeners();
btnEdit.addEventListener('click', (event) => {
    const userInfo = userInfos.getUserInfo();
    popupEditName.value = userInfo.name;
    popupEditAbout.value = userInfo.about;
    popupEdit.open();
});

// Функция создания экземпляра класса card
const createCard = (name, link) => {
    const card = new Card(name, link, "#photo-card", () => {
        popupImage.open({
            name: name,
            link: link,
        });
    });
    return card.generateCard();
};

// Форма создания
const popupCreateCard = new PopupWithForm('.popup.popup-create', (values) => {
    const cardElement = createCard(values['popup-form-mesto'], values['popup-form-link']);
    cardsList.prependItem(cardElement);
});

popupCreateCard.setEventListeners();
btnAddCard.addEventListener('click', () => {
    popupCreateCard.open();
});


// Экземпляры класса валидации конкретной формы
const formProfile = new Form(validationConfig, ".popup-form-profile");
formProfile.enableValidation();

const formCard = new Form(validationConfig, ".popup-form-card");
formCard.enableValidation();

// Экземпляр класса для враппера
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item.name, item.link);
      cardsList.appendItem(cardElement);
      },
    },
    ".photogallery__wrapper"
  );

cardsList.renderItems();
