const page = document.querySelector('.page');

const buttonOpenPopupCreateCard = page.querySelector('.profile__add');
const buttonOpenPopupEditProfile = page.querySelector('.profile__edit');

const popup = page.querySelector('.popup');
const formPopup = popup.querySelector('.popup__container');

const popupEditProfile = page.querySelector('.popup_type_edit');
const popupCreateCard = page.querySelector('.popup_type_create');
const popupViewPhoto = page.querySelector('.popup_type_view');

const popupName = popupEditProfile.querySelector('.popup__input_type_name');
const popupDescription = popupEditProfile.querySelector('.popup__input_type_description');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');

const popupCardName = popupCreateCard.querySelector('.popup__input_type_title');
const popupCardLink = popupCreateCard.querySelector('.popup__input_type_link');

const popupView = page.querySelector('.popup_type_view');
const popupImage = popupView.querySelector('.popup__image');
const popupNameImage = popupView.querySelector('.popup__caption');

const cardsTemplate = page.querySelector('#cards');

/* Открытие формы */

function openPopup(name) {
  name.classList.add('popup_opened');
}

/* Закрытие формы */

function closePopup(name) {
  name.classList.remove('popup_opened');
}

/* Сохранение данных в форме редактирования профиля*/

function savePopup(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup(popup);
}

/* Поставить лайк */

function like(name) {
  name.classList.toggle('card__like_active');
}

/* Массив карточек */

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

/* Открытие изображений */

function openImageView(card) {
  openPopup(popupView);

  popupImage.alt = card.querySelector('.card__image').alt;
  popupNameImage.textContent = card.querySelector('.card__title').textContent;
  popupImage.src = card.querySelector('.card__image').src;
}

/* Создание карточек из массива с функционалом кнопок*/

function createCard(name, link) {
  const card = cardsTemplate.content.querySelector('.card').cloneNode(true);

  card.querySelector('.card__image').alt = name;
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__image').src = link;

  /* Кнопка лайка */

  card.querySelector('.card__like').addEventListener('click', () => {
    like(card.querySelector('.card__like'));
  });

  /* Просмотр картинки */

  card.querySelector('.card__image').addEventListener('click', () => {
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

  const cardName = popupCardName.value;
  const cardLink = popupCardLink.value;

  renderCardStart(cardName, cardLink);

  popupCardName.value = '';
  popupCardLink.value = '';

  closePopup(popupCreateCard);
}

/* Слушатели */

/* Открытие форм */

buttonOpenPopupEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
});

buttonOpenPopupCreateCard.addEventListener('click', () => {
  openPopup(popupCreateCard);
});

/* Сохранение данных в профиле */

popupEditProfile.addEventListener('submit', savePopup);

/* Создание новой карточки */

popupCreateCard.addEventListener('submit', addNewCard);

/* Закрытие форм */

popupEditProfile.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(popupEditProfile);
});

popupCreateCard.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(popupCreateCard);
});

popupViewPhoto.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(popupViewPhoto);
});





