        // Попап, закрытие попапа
const popups = document.querySelectorAll('.popup');
const btnClose = document.querySelectorAll('.popup__btn-close');

        // Секция profile и кнопка EDIT (вне попапа)
const btnEdit = document.querySelector('.profile-info__btn-edit');
const profileName = document.querySelector('.profile-info__name');
const profileAbout = document.querySelector('.profile-info__description');

        // Попап редактирования имени и описания
const popupEdit = document.querySelector('.popup.popup-edit');
const popupEditForm = document.querySelector('.popup-edit .popup__container');
const popupEditName = document.querySelector('.popup-edit .popup-form__input_field_name');
const popupEditAbout = document.querySelector('.popup-edit .popup-form__input_field_description');

        // Попап создания карточки с городом
const popupCreate = document.querySelector('.popup.popup-create');
const popupCreateForm = document.querySelector('.popup-create .popup__container');
const popupCreateName = document.querySelector('.popup-create .popup-form__input_field_name');
const popupCreateLink = document.querySelector('.popup-create .popup-form__input_field_description');

        // Остальное касающееся карточек
const container = document.querySelector('.content');
const cardContainer = document.querySelector('.photogallery__wrapper');
const cardTemplate = document.querySelector('#photo-card').content;
const addProfile = document.querySelector('.profile__btn-add');

const popupImage = document.querySelector('.popup.popup-image');
const popupOpenImage = document.querySelector('.popup-image__image');
const popupCaption = document.querySelector('.popup-image__caption');

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

function closePopup() {
    popups.forEach(function (popup) {
        popup.classList.remove('popup_opened');
    });
}

// Закрытие попапа (всех попапов)
btnClose.forEach(function (btn) {
    btn.addEventListener('click', function(event) {
        closePopup();
    });
});

// Присвоение кнопке Edit - события и открытие popup 
btnEdit.addEventListener('click', function(event) {
    popupEditName.value = profileName.textContent;
    popupEditAbout.value = profileAbout.textContent;

    popupEdit.classList.add('popup_opened');
});

// Отправка формы редактирования
popupEditForm.addEventListener('submit', function(event) {
    event.preventDefault();

    profileName.textContent = popupEditName.value;
    profileAbout.textContent = popupEditAbout.value;

    closePopup();
});

// Открытие формы создания
addProfile.addEventListener('click', function(event) {
    popupCreate.classList.add('popup_opened');
});

// Отправка формы создания
popupCreateForm.addEventListener('submit', function(event) {
    event.preventDefault();

    addCardToStart({
        name: popupCreateName.value,
        link: popupCreateLink.value
    });

    popupCreateName.value = "";
    popupCreateLink.value = "";

    closePopup();
});

// Создаем карточку
function createCard(card) {
    const cardElement = cardTemplate.cloneNode(true);
    const imageElement = cardElement.querySelector(".photo-card__image");
    const cardTitle = cardElement.querySelector(".photo-card__title");
    cardElement.querySelector('.photo-card__btn-like').addEventListener('click', function (evt){
        evt.target.classList.toggle('photo-card__btn-like_active');
    });

    imageElement.src = card.link;
    imageElement.alt = card.name;
    cardTitle.textContent = card.name;

    return cardElement;
}

// Добавить карточку в конец
function addCardToEnd(card) {
    cardContainer.append(createCard(card));
    removeListener();
    imageListener();
}

// Добавить карточку в начало
function addCardToStart(card) {
    cardContainer.prepend(createCard(card));
    removeListener();
    imageListener();
}

initialCards.forEach(addCardToEnd);

function removeListener() {
    document.querySelectorAll(".photo-card").forEach(function(card) {
        const removeButton = card.querySelector(".photo-card__btn-remove");

        removeButton.addEventListener("click", function(event) {
            card.remove();
        });
    }); 
}

function imageListener() {
    document.querySelectorAll(".photo-card").forEach(function(card) {
        const image = card.querySelector(".photo-card__image");
        const text = card.querySelector(".photo-card__title").textContent;

        image.addEventListener("click", function(event) {
            popupOpenImage.src = image.src;
            popupCaption.innerHTML = text;
            popupImage.classList.add('popup_opened');
        });
    }); 
}
