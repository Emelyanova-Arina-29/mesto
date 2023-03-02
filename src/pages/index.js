import { Card } from '../scripts/components/Card.js';
import { initialCards, validationConfig, personalData } from '../scripts/utils/constants.js';
import { buttonOpenPopupCreateCard,
  buttonOpenPopupEditProfile,
  formPopupEdit, formPopupAdd,
  popupImage, popupNameImage,
  inputNameProfile, inputDescriptionProfile,
  formPopupAvatar, buttonOpenPopupAvatar,
  inputAvatar } from '../scripts/utils/elements.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import './index.css';
import Api from '../scripts/components/Api.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation';

/* Подключение валидации */

const validationformPopupEdit = new FormValidator(validationConfig, formPopupEdit);
validationformPopupEdit.enableValidation();

const validationformPopupAdd = new FormValidator(validationConfig, formPopupAdd);
validationformPopupAdd.enableValidation();

const validationformPopupAvatar = new FormValidator(validationConfig, formPopupAvatar);
validationformPopupAvatar.enableValidation();

/* Подключение Api */

const api = new Api(personalData);

let userId;

/* Данные профиля */

const user = new UserInfo({
  selectorName: '.profile__name',
  selectorDescription: '.profile__description',
  selectorAvatar: '.profile__avatar'
});

/* Добавление массива карточек */

const cardList = new Section({
  renderer: (items) => {
    const element = createCard(items);

    cardList.addItem(element);
  }
  }, '.cards'
);

/* Создание карточек */

function createCard(data) {
  const card = new Card(data, '#cards', userId, handleCardClick,
  { deleteCardClick: (cardId) => {
    popupDeleteCard.openPopup();
    popupDeleteCard.setSubmitHandler(() => {
      popupDeleteCard.renderLoading(true);
      api.deleteCard(cardId)
        .then(() => {
          card.deleteCard();
          popupDeleteCard.closePopup();
        })
        .catch((err) => {
          console.log(`Произошла ошибка: ${err}`);
        })
        .finally(() => {
          popupDeleteCard.renderLoading(false);
        })
    })
  },
  handleLike: (cardId) => {
    api.addLikeCard(cardId)
      .then((res) => {
        card.likeCard(res);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  },
  removeLike: (cardId) => {
    api.deleteLikeCard(cardId)
      .then((data) => {
        card.likeCard(data);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }
  }
);
  const cardElement = card.generateCard();

  return cardElement;
}

/* Загрузка информации о пользователе и карточек с сервера */

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    user.setUserInfo(userData);
    userId = userData._id;
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Произошла ошибка: ${err}`);
  }
)

/* Открытие изображения карточки */

const popupWithImage = new PopupWithImage('.popup_type_view', popupImage, popupNameImage);
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.openPopup(name, link);
}

/* Изменение данных профиля */

const popupEditProfile = new PopupWithForm('.popup_type_edit',
(data) => {
  popupEditProfile.renderLoading(true);
  api.editUserInfo(data.inputNameProfile, data.inputDescriptionProfile)
    .then((data) => {
      user.setUserInfo(data);
      popupEditProfile.closePopup();
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false);
    })
})

popupEditProfile.setEventListeners();

buttonOpenPopupEditProfile.addEventListener('click', () => {
  validationformPopupEdit.removeValidation();
  const { name, about } = user.getUserInfo();

  inputNameProfile.value = name;
  inputDescriptionProfile.value = about;

  popupEditProfile.openPopup();
})

/* Добавление новых карточек */

const popupCreateCard = new PopupWithForm('.popup_type_create',
(data) => {
  popupCreateCard.renderLoading(true);
  api.createCard(data.name, data.link)
    .then((data) => {
      cardList.addItemStart(createCard(data));
      popupCreateCard.closePopup();
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    })
    .finally(() => {
      popupCreateCard.renderLoading(false);
    })
});

popupCreateCard.setEventListeners();

buttonOpenPopupCreateCard.addEventListener('click', () => {
  validationformPopupAdd.removeValidation();
  popupCreateCard.openPopup();
});

/* Изменение аватара пользователя */

const popupAvatar = new PopupWithForm('.popup_type_avatar',
(data) => {
  popupAvatar.renderLoading(true);
  api.editUserAvatar(data.inputAvatar)
    .then((data) => {
      user.setUserInfo(data);
      popupAvatar.closePopup();
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    })
    .finally(() => {
      popupAvatar.renderLoading(false);
    })
});
popupAvatar.setEventListeners();

buttonOpenPopupAvatar.addEventListener('click', () => {
  validationformPopupAvatar.removeValidation();
  popupAvatar.openPopup();
})

/* Подтверждение удаления карточки */

const popupDeleteCard = new PopupWithConfirmation('.popup_type_delete')

popupDeleteCard.setEventListeners()





