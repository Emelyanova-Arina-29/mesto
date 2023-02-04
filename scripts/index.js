import { Card } from './Card.js';
import { initialCards, validationConfig } from './constants.js';
import { FormValidator } from './FormValidator.js';

const page = document.querySelector('.page');

const buttonOpenPopupCreateCard = page.querySelector('.profile__add');
const buttonOpenPopupEditProfile = page.querySelector('.profile__edit');

const popups = document.querySelectorAll('.popup');

const formPopupEdit = document.forms.popupEdit;
const formpopupAdd = document.forms.popupAdd;

const popupEditProfile = page.querySelector('.popup_type_edit');
const popupCreateCard = page.querySelector('.popup_type_create');

const inputUserName = popupEditProfile.querySelector('.popup__input_type_name');
const inputUserDescription = popupEditProfile.querySelector('.popup__input_type_description');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');

const inputCardName = popupCreateCard.querySelector('.popup__input_type_title');
const inputCardLink = popupCreateCard.querySelector('.popup__input_type_link');

const popupView = page.querySelector('.popup_type_view');
const popupImage = popupView.querySelector('.popup__image');
const popupNameImage = popupView.querySelector('.popup__caption');

/* Контейнер для добавления карточек */

const cardContainer = page.querySelector('.cards');

/* Объявление функций */

/* Закрытие формы по Esc */

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

/* Открытие формы */

function openPopup(name) {
  name.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

/* Закрытие формы */

function closePopup(name) {
  name.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

/* Открытие изображения карточки */

function handleCardClick(name, link) {
  popupImage.alt = name;
  popupNameImage.textContent = name;
  popupImage.src = link;

  openPopup(popupView);
}

/* Сохранение данных в форме редактирования профиля*/

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputUserName.value;
  profileDescription.textContent = inputUserDescription.value;
  closePopup(popupEditProfile);
}

/* Создание карточек */

function createCard(data, templateId) {
  const card = new Card(data, templateId, handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

/* Добавление карточек на страницу в конец*/

function renderCard(data, templateId) {
  cardContainer.append(createCard(data, templateId));
}

/* Добавление карточек на страницу в начало*/

function renderCardStart(data, templateId) {
  cardContainer.prepend(createCard(data, templateId));
}

/* Добавление новых карточек кнопкой*/

function addNewCard(evt) {
  evt.preventDefault();
  const data = {
    name: inputCardName.value,
    link: inputCardLink.value
  };

  renderCardStart(data, '#cards');
  closePopup(popupCreateCard);
}

/* Слушатели */

/* Открытие форм */

buttonOpenPopupEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
  inputUserName.value = profileName.textContent;
  inputUserDescription.value = profileDescription.textContent;
});

buttonOpenPopupCreateCard.addEventListener('click', () => {
  openPopup(popupCreateCard);
  validationformPopupAdd.removeValidation();
});

/* Сохранение данных в профиле */

popupEditProfile.addEventListener('submit', submitEditProfileForm);

/* Создание новой карточки */

popupCreateCard.addEventListener('submit', (evt) => {
  addNewCard(evt);

  evt.target.reset();
});

/* Закрытие форм по крестику и по клику на Overlay */

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

/* Вызов функций и запуск циклов */

/* Перебор элементов массива */

initialCards.forEach((item) => {
  renderCard(item, '#cards');
})

/* Подключение валидации */

const validationformPopupEdit = new FormValidator(validationConfig, formPopupEdit);
validationformPopupEdit.enableValidation();

const validationformPopupAdd = new FormValidator(validationConfig, formpopupAdd);
validationformPopupAdd.enableValidation();




