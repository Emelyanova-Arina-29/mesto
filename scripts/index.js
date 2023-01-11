const page = document.querySelector('.page');

const buttonOpenPopupCreateCard = page.querySelector('.profile__add');
const buttonOpenPopupEditProfile = page.querySelector('.profile__edit');

const popup = page.querySelector('.popup');
const formPopup = popup.querySelector('.popup__form');

const popupEditProfile = page.querySelector('.popup_type_edit');
const popupCreateCard = page.querySelector('.popup_type_create');
const popupViewPhoto = page.querySelector('.popup_type_view');

const inputUserName = popupEditProfile.querySelector('.popup__input_type_name');
const inputUserDescription = popupEditProfile.querySelector('.popup__input_type_description');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');

const inputCardName = popupCreateCard.querySelector('.popup__input_type_title');
const inputCardLink = popupCreateCard.querySelector('.popup__input_type_link');

const popupView = page.querySelector('.popup_type_view');
const popupImage = popupView.querySelector('.popup__image');
const popupNameImage = popupView.querySelector('.popup__caption');

const cardsTemplate = page.querySelector('#cards');

const popupEditProfileClose = popupEditProfile.querySelector('.popup__close');
const popupCreateCardClose = popupCreateCard.querySelector('.popup__close');
const popupViewPhotoClose = popupViewPhoto.querySelector('.popup__close');

/* Закрытие формы по клику на Overlay */

function closePopupOverlay(evt, item) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(item);
  }
}

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

/* Сохранение данных в форме редактирования профиля*/

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputUserName.value;
  profileDescription.textContent = inputUserDescription.value;
  closePopup(popup);
}

/* Поставить лайк */

function like(name) {
  name.classList.toggle('card__like_active');
}

/* Открытие изображений */

function openImageView(element) {
  openPopup(popupView);

  popupImage.alt = element.querySelector('.card__image').alt;
  popupNameImage.textContent = element.querySelector('.card__title').textContent;
  popupImage.src = element.querySelector('.card__image').src;
}

/* Создание карточек из массива с функционалом кнопок*/

function createCard(name, link) {
  const card = cardsTemplate.content.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');

  cardImage.alt = name;
  card.querySelector('.card__title').textContent = name;
  cardImage.src = link;

  /* Кнопка лайка */

  card.querySelector('.card__like').addEventListener('click', () => {
    like(card.querySelector('.card__like'));
  });

  /* Просмотр картинки */

  cardImage.addEventListener('click', () => {
    openImageView(card);
  });

  /* Удаление карточки */

  card.querySelector('.card__delete').addEventListener('click', () => {
    card.remove();
  });

  return card;
}

/* Контейнер для добавления карточек */

const cardContainer = page.querySelector('.cards');

/* Добавление карточек на страницу в конец*/

function renderCard(name, link) {
  cardContainer.append(createCard(name, link));
}

/* Добавление карточек на страницу в начало*/

function renderCardStart(name, link) {
  cardContainer.prepend(createCard(name, link));
}

/* Перебор элементов массива */

initialCards.forEach((elementCard) => {
  renderCard(elementCard.name, elementCard.link);
})

/* Добавление новых карточек кнопкой*/

function addNewCard(evt) {
  evt.preventDefault();

  const cardName = inputCardName.value;
  const cardLink = inputCardLink.value;

  renderCardStart(cardName, cardLink);

  inputCardName.value = '';
  inputCardLink.value = '';

  closePopup(popupCreateCard);
}

/* Объект, состоящий из свойств, значениями которых являются классы, необходимые для универсального написания кода валидации */

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

/* Вызов функции подключения валидации */

enableValidation(validationConfig);

/* Слушатели */

/* Открытие форм */

buttonOpenPopupEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
  inputUserName.value = profileName.textContent;
  inputUserDescription.value = profileDescription.textContent;
});

buttonOpenPopupCreateCard.addEventListener('click', () => {
  openPopup(popupCreateCard);
});

/* Сохранение данных в профиле */

popupEditProfile.addEventListener('submit', submitEditProfileForm);

/* Создание новой карточки */

popupCreateCard.addEventListener('submit', addNewCard);

/* Закрытие форм */

popupEditProfileClose.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

popupCreateCardClose.addEventListener('click', () => {
  closePopup(popupCreateCard);
});

popupViewPhotoClose.addEventListener('click', () => {
  closePopup(popupViewPhoto);
});

/* Закрытие формы по клику на Overlay */

popupEditProfile.addEventListener('mousedown', (evt) => {
  closePopupOverlay(evt, popupEditProfile);
});

popupCreateCard.addEventListener('mousedown', (evt) => {
  closePopupOverlay(evt, popupCreateCard);
});

popupViewPhoto.addEventListener('mousedown', (evt) => {
  closePopupOverlay(evt, popupViewPhoto);
});

