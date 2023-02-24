import { Card } from '../scripts/components/Card.js';
import { initialCards, validationConfig } from '../scripts/utils/constants.js';
import { buttonOpenPopupCreateCard,
  buttonOpenPopupEditProfile,
  formPopupEdit, formpopupAdd,
  popupImage, popupNameImage,
  inputNameProfile, inputDescriptionProfile } from '../scripts/utils/elements.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import './index.css'

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
