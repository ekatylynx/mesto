let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__container');
let btnClose = document.querySelector('.popup__btn-close');
let popupName = document.querySelector('.popup-form__input_field_name');
let popupAbout = document.querySelector('.popup-form__input_field_description');

let btnEdit = document.querySelector('.profile-info__btn-edit');
let profileName = document.querySelector('.profile-info__name');
let profileAbout = document.querySelector('.profile-info__description');

btnEdit.addEventListener('click', function(event) {
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;

    popup.classList.add('popup_opened');
});

btnClose.addEventListener('click', function(event) {
    event.preventDefault();
    popup.classList.remove('popup_opened');
});

popupForm.addEventListener('submit', function(event) {
    event.preventDefault();

    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;

    popup.classList.remove('popup_opened');
});