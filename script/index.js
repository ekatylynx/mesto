import Card from './Card.js';
import Form from './Form.js';
import Section from './Section.js';
import Popup from './Popup.js';
import { openPopup, closePopup } from './utils.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

// УДАЛИТЬ ЛИШНЕЕ!!!
// const popups = document.querySelectorAll('.popup');
const btnEdit = document.querySelector('.profile-info__btn-edit');
// const profileName = document.querySelector('.profile-info__name');
// const profileAbout = document.querySelector('.profile-info__description');
// const popupEdit = document.querySelector('.popup.popup-edit');
// const popupEditForm = document.querySelector('.popup-edit .popup-form');
const popupEditName = document.querySelector('.popup-edit .popup-form__input_field_name');
const popupEditAbout = document.querySelector('.popup-edit .popup-form__input_field_description');
const btnAddCard = document.querySelector('.profile__btn-add');
// const popupCreate = document.querySelector('.popup.popup-create');
// const popupCreateForm = document.querySelector('.popup-create .popup-form');
const popupCreateName = document.querySelector('.popup-create .popup-form__input_field_name');
const popupCreateLink = document.querySelector('.popup-create .popup-form__input_field_description');
// const cardsWrapper = document.querySelector(".photogallery__wrapper");
// УДАЛИТЬ ЛИШНЕЕ!!!

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


const UserInfos = new UserInfo({
    nameSelector: '.profile-info__name',
    aboutSelector: '.profile-info__description',
});

// Попап картинки
const popupImage = new PopupWithImage('.popup.popup-image');
popupImage.setEventListeners();

// Форма редактирования
const popupEdit = new PopupWithForm('.popup.popup-edit', () => {
    UserInfos.setUserInfo(popupEditName.value, popupEditAbout.value);
});

popupEdit.setEventListeners();
btnEdit.addEventListener('click', (event) => {
    const userInfo = UserInfos.getUserInfo();
    popupEditName.value = userInfo.name;
    popupEditAbout.value = userInfo.about;
    popupEdit.open();
});

// Форма создания
const popupCreate_ = new PopupWithForm('.popup.popup-create', () => {
    const card = new Card(popupCreateName.value, popupCreateLink.value, "#photo-card", () => {
        popupImage.open({
            name: card._name,
            link: card._link,
        });
    });
    const cardElement = card.generateCard();
    cardsList.prependItem(cardElement);
});
popupCreate_.setEventListeners();
btnAddCard.addEventListener('click', () => {
    popupCreate_.open();
});






// Кнопки закрытия попапов
// popups.forEach((popup) => {
//     const btnClose = popup.querySelector('.popup__btn-close');

//     btnClose.addEventListener('click', () => {
//         closePopup(popup);
//     });
// });

// btnEdit.addEventListener('click', (event) => {
//     popupEditName.value = profileName.textContent;
//     popupEditAbout.value = profileAbout.textContent;

//     openPopup(popupEdit);
// });

// popupEditForm.addEventListener('submit', (event) => {
//     event.preventDefault();

//     profileName.textContent = popupEditName.value;
//     profileAbout.textContent = popupEditAbout.value;

//     closePopup(popupEdit);
// });

// btnAddCard.addEventListener('click', () => {
//     popupCreateForm.reset();
//     openPopup(popupCreate);
// });

// popupCreateForm.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const card = new Card(
//         popupCreateName.value,
//         popupCreateLink.value,
//         "#photo-card",
//         ".photogallery__wrapper"
//     );
    
//     const cardElement = card.generateCard();

//     cardsWrapper.prepend(cardElement);
//     closePopup(popupCreate);
// });

// Экземпляры класса валидации конкретной формы
const formProfile = new Form(validationConfig, ".popup-form-profile");
formProfile.enableValidation();

const formCard = new Form(validationConfig, ".popup-form-card");
formCard.enableValidation();

// Экземпляр класса для враппера
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        // const card = new Card(item.name, item.link, "#photo-card", popupImage);
        const card = new Card(item.name, item.link, "#photo-card", () => {
            popupImage.open({
                name: item.name,
                link: item.link,
            });
        });
      const cardElement = card.generateCard();
  
      cardsList.appendItem(cardElement);
      },
    },
    ".photogallery__wrapper"
  );

cardsList.renderItems();
