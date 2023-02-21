import { Card } from './Card.js';
import { initialCards, validationConfig } from './constants.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const page = document.querySelector('.page');

const buttonOpenPopupCreateCard = page.querySelector('.profile__add');
const buttonOpenPopupEditProfile = page.querySelector('.profile__edit');

const formPopupEdit = document.forms.popupEdit;
const formpopupAdd = document.forms.popupAdd;

const editProfilePopup = page.querySelector('.popup_type_edit');
const createCardPopup = page.querySelector('.popup_type_create');

const inputUserName = formPopupEdit.elements.nameProfile;
const inputUserDescription = formPopupEdit.elements.descriptionProfile;
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');
const popupView = page.querySelector('.popup_type_view');
const popupImage = popupView.querySelector('.popup__image');
const popupNameImage = popupView.querySelector('.popup__caption');
const inputCardName = page.querySelector('.popup__input_type_title');
const inputCardLink = page.querySelector('.popup__input_type_link');
const inputNameProfile = page.querySelector('.popup__input_type_name');
const inputDescriptionProfile = page.querySelector('.popup__input_type_description');

/* Подключение валидации */

const validationformPopupEdit = new FormValidator(validationConfig, formPopupEdit);
validationformPopupEdit.enableValidation();

const validationformPopupAdd = new FormValidator(validationConfig, formpopupAdd);
validationformPopupAdd.enableValidation();

const user = new UserInfo({selectorName: '.profile__name', selectorDescription: '.profile__description'});

const popupWithImage = new PopupWithImage('.popup_type_view', popupImage, popupNameImage);
popupWithImage.setEventListeners();

/* Открытие изображения карточки */

function handleCardClick() {
  popupWithImage.openPopup(this.getNameImage(), this.getLinkImage());
}

/* Создание карточек */

function createCard(data) {
  const card = new Card(data, '#cards', handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

/* Добавление массива карточек */

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cardList.addItem(card);
  }
  }, '.cards'
);
cardList.renderItems();

/* Изменение данных профиля */

const popupEditProfile = new PopupWithForm('.popup_type_edit', submitEditForm);

function submitEditForm(data) {

	user.setUserInfo({ name: data.inputNameProfile, description: data.inputDescriptionProfile });
  popupEditProfile.closePopup();

}

popupEditProfile.setEventListeners();

buttonOpenPopupEditProfile.addEventListener('click', () => {
  validationformPopupEdit.removeValidation();
  const { name, description } = user.getUserInfo();

  inputNameProfile.value = name;
  inputDescriptionProfile.value = description;

  popupEditProfile.openPopup();
  validationformPopupEdit.buttonStateOff();
})

/* Добавление новых карточек */

const popupCreateCard = new PopupWithForm('.popup_type_create', (data) => {
  const newCard = createCard({ name: data.name, link: data.link });
  cardList.addItemStart(newCard);
  console.log(data)
});

popupCreateCard.setEventListeners();

buttonOpenPopupCreateCard.addEventListener('click', () => {
  validationformPopupAdd.removeValidation();
  popupCreateCard.openPopup();
  validationformPopupAdd.buttonStateOff();
});
