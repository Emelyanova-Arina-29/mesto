const page = document.querySelector('.page');
const buttonOpenPopup = page.querySelector('.profile__edit');
const popup = page.querySelector('.popup');
const popupName = popup.querySelector('.popup__input_type_name');
const popupDescription = popup.querySelector('.popup__input_type_description');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');
const buttonClosePopup = popup.querySelector('.popup__close');
const formPopup = popup.querySelector('.popup__container');

/* Открытие формы */

function openPopup() {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}

/* Закрытие формы */

function closePopup() {
  popup.classList.remove('popup_opened');
}

/* Сохранение данных */

function savePopup(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup();
}

/* Слушатели */

buttonOpenPopup.addEventListener('click', openPopup);

buttonClosePopup.addEventListener('click', closePopup);

formPopup.addEventListener('submit', savePopup);
