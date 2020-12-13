        // Все попапы содержащие класс popup
const popups = document.querySelectorAll('.popup');

        // Секция profile и кнопка EDIT (вне попапа)
const btnEdit = document.querySelector('.profile-info__btn-edit');
const profileName = document.querySelector('.profile-info__name');
const profileAbout = document.querySelector('.profile-info__description');

        // Попап редактирования имени и описания
const popupEdit = document.querySelector('.popup.popup-edit');
const popupEditForm = document.querySelector('.popup-edit .popup-form');
const popupEditName = document.querySelector('.popup-edit .popup-form__input_field_name');
const popupEditAbout = document.querySelector('.popup-edit .popup-form__input_field_description');

        // Попап создания карточки с городом
const popupCreate = document.querySelector('.popup.popup-create');
const popupCreateForm = document.querySelector('.popup-create .popup-form');
const popupCreateName = document.querySelector('.popup-create .popup-form__input_field_name');
const popupCreateLink = document.querySelector('.popup-create .popup-form__input_field_description');

        // Остальное касающееся карточек
const cardContainer = document.querySelector('.photogallery__wrapper');
const cardTemplate = document.querySelector('#photo-card').content; 
const btnAddCard = document.querySelector('.profile__btn-add'); // Кнопка добавления карточки

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


// Функция открытия попапа

function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closeByOverlayClick);
    document.addEventListener('keyup', closeByEscape);
}

// Добавить карточку в конец
function addCardToEnd(card) {
    cardContainer.append(createCard(card));
}

// Добавить карточку в начало
function addCardToStart(card) {
    cardContainer.prepend(createCard(card));
}

initialCards.forEach(addCardToEnd);


// Функция закрытия попапа;

function closePopup(popup) {
    if (popup) {
        popup.classList.remove('popup_opened');
        popup.removeEventListener('click', closeByOverlayClick);
        document.removeEventListener('keyup', closeByEscape);
    }
};

// Закрытие попапа на клик по кнопке;

popups.forEach(function (popup) {
    const btnCloses = popup.querySelector('.popup__btn-close');

    btnCloses.addEventListener('click', function(event) {
        closePopup(popup);
    });
});

function closeByEscape(event) { 
    if (event.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

// Закрытие попапа на клик по оверлею

function closeByOverlayClick(event) {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target);
    }
}

// Функция создания карточки с городом и возвращение;
function createCard(card) {
// function createCard({link, name}) {
    const cardElement = cardTemplate.cloneNode(true);
    const itemCardTemplate = cardElement.querySelector('.photo-card')
    const imageElement = cardElement.querySelector('.photo-card__image');
    const cardTitle = cardElement.querySelector('.photo-card__title');
    const btnTrash = cardElement.querySelector('.photo-card__btn-remove');
    const btnLike = cardElement.querySelector('.photo-card__btn-like');

        // Меняем класс у лайка при нажатии
    btnLike.addEventListener('click', function (event){
        event.target.classList.toggle('photo-card__btn-like_active');
    });
        //Открываем попап при клике на картинку
    imageElement.addEventListener('click', function() {
        popupOpenImage.src = card.link;
        popupCaption.textContent = card.name;
        openPopup(popupImage);
    });
        // Удаляем айтем карточки из шаблона, при клике на btnTrash
    btnTrash.addEventListener('click', function(event) {
        cardContainer.removeChild(itemCardTemplate);
    });

    imageElement.src = card.link;
    imageElement.alt = card.name;
    cardTitle.textContent = card.name;

    return cardElement;
}


// Добавление карточки: Открываем попап на клик на btnAddCard;

btnAddCard.addEventListener('click', function(event) {
    popupCreateForm.reset();
    openPopup(popupCreate);
});

// Добавление карточки: отправка формы и закрытие попапа;

popupCreateForm.addEventListener('submit', function(event) {
    event.preventDefault();

    addCardToStart({
        name: popupCreateName.value,
        link: popupCreateLink.value
    });

    // popupCreateName.value = "";
    // popupCreateLink.value = "";

    closePopup(popupCreate);
});

// Редакт. профиля: Открываем попап на клик на btnEdit;

btnEdit.addEventListener('click', function(event) {
    popupEditName.value = profileName.textContent;
    popupEditAbout.value = profileAbout.textContent;

    openPopup(popupEdit);
});

// Редакт. профиля: отправка формы и закрытие попапа;

popupEditForm.addEventListener('submit', function(event) {
    event.preventDefault();

    profileName.textContent = popupEditName.value;
    profileAbout.textContent = popupEditAbout.value;

    closePopup(popupEdit);
})