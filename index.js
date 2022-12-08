let page = document.querySelector('.page');
let buttonOpenPopup = page.querySelector('.profile__edit');
let popup = page.querySelector('.popup');
let popupOpened = page.querySelector('.popup_opened');
let popupName = popup.querySelector('.popup__input_type_name');
let popupDescription = popup.querySelector('.popup__input_type_description');
let profileName = page.querySelector('.profile__name');
let profileDescription = page.querySelector('.profile__description');
let buttonClosePopup = popup.querySelector('.popup__close');
let buttonSavePopup = popup.querySelector('.popup__save');
let formPopup = popup.querySelector('.popup__container');

/* Открытие формы */

function openPopup() {
  popup.classList.add('popup_opened');
  popupName.setAttribute('value', profileName.textContent);
  popupDescription.setAttribute('value', profileDescription.textContent);
}

buttonOpenPopup.addEventListener('click', openPopup);

/* Закрытие формы */

function closePopup() {
  popup.classList.remove('popup_opened');
}

buttonClosePopup.addEventListener('click', closePopup);

/* Сохранение данных */

function savePopup(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup();
}

formPopup.addEventListener('submit', savePopup);
