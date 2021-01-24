import "./index.css";

import Card from '../components/Card.js';
import Form from '../components/Form.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from "../components/Api";


const btnEdit = document.querySelector('.profile-info__btn-edit');

const popupEditName = document.querySelector('.popup-edit .popup-form__input_field_name');
const popupEditAbout = document.querySelector('.popup-edit .popup-form__input_field_description');
const btnAddCard = document.querySelector('.profile__btn-add');

const btnAvatar = document.querySelector('.profile__wrappers');

// Конфиг для валидации
const validationConfig = {
    inputSelector: '.popup-form__input',
    submitButtonSelector: '.popup-form__btn-submit',
    inputInvalidClass: '.popup-form__input_type_error',
    buttonInvalidClass: 'popup-form__btn-submit_invalid',
    errorClass: 'popup-form__input_type_invalid',
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
    headers: {
        authorization: '0eeb4c96-bb84-4d08-b5d5-7ff8bde46738',
        'Content-Type': 'application/json'
    }
});

// Экземпляр класса пользователя
const userInfos = new UserInfo({
    nameSelector: '.profile-info__name',
    aboutSelector: '.profile-info__description',
    avatarSelector: '.profile__avatar',
});

// Попап картинки
const popupImage = new PopupWithImage('.popup.popup-image');
popupImage.setEventListeners();


const popupConfirm = new PopupWithForm('.popup.popup-confirm', (values, close) => {
    api.removeCard(values['popup-form-id'])
        .then(res => {
            document.getElementById(values['popup-form-id']).remove();
            close();
        })
        .catch(err => {
            console.log(err);
        });
});
popupConfirm.setEventListeners();

const popupAvatar = new PopupWithForm('.popup.popup-avatar', (values, close) => {
    // console.log(values);
    api.updateAvatar(values['popup-form-avatar'])
        .then(res => {
            userInfos.setUserInfo(res._id, res.name, res.about, res.avatar);
            close();
        })
        .catch(err => {
            console.log(err);
        });
});
popupAvatar.setEventListeners();

btnAvatar.addEventListener('click', () => {
    popupAvatar.open();
})

// Форма редактирования имени
const popupEdit = new PopupWithForm('.popup.popup-edit', (values, close) => {
    api.setUser(values)
        .then(res => {
            userInfos.setUserInfo(res._id, values['popup-form-name'], values['popup-form-about'], res.avatar);
            close();
        })
        .catch(err => {
            console.log(err);
        });
});

popupEdit.setEventListeners();
btnEdit.addEventListener('click', (event) => {
    const userInfo = userInfos.getUserInfo();
    popupEditName.value = userInfo.name;
    popupEditAbout.value = userInfo.about;
    popupEdit.open();
});

// Функция создания экземпляра класса card
const createCard = (id, name, link, ownerId, likes) => {
    const onRemove = () => {
        document.querySelector('.popup-form__input_field_id').value = id;
        popupConfirm.open();
    }

    const card = new Card(id, name, link, likes, api, userInfos.getUserInfo().id, ownerId, onRemove, "#photo-card", () => {
        popupImage.open({
            name: name,
            link: link,
        });
    });
    return card.generateCard();
};

// Форма создания
const popupCreateCard = new PopupWithForm('.popup.popup-create', (values, close) => {
    api.createCard(values)
        .then(res => {
            const cardElement = createCard(res._id, values['popup-form-mesto'], values['popup-form-link'], res.owner._id, res.likes);
            cardsList.prependItem(cardElement);
            close();
        })
        .catch(err => {
            console.log(err);
        });
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

const formAvatar = new Form(validationConfig, ".popup-form-avatar");
formAvatar.enableValidation();

api.getUser()
    .then(res => {
        userInfos.setUserInfo(res._id, res.name, res.about, res.avatar);
    })
    .catch(err => {
        console.log(err);
    });


let cardsList;

api.getCards()
    .then(res => {
        // Экземпляр класса для враппера
        cardsList = new Section(
            {
                items: res,
                renderer: (item) => {
                    const cardElement = createCard(item._id, item.name, item.link, item.owner._id, item.likes);
                    cardsList.appendItem(cardElement);
                },
            },
            ".photogallery__wrapper"
        );

        cardsList.renderItems();
    })
    .catch(err => {
        console.log(err);
    });
