import { popupView, popupImage, popupNameImage, openPopup} from './index.js';

export class Card {
  constructor(data, templateId) {
    this._name = data.name;
    this._link = data.link;
    this._templateId = templateId;
  }

  _getTemplate() {
    const card = document.querySelector(this._templateId).
    content.querySelector('.card').cloneNode(true);

    return card;
  }

  /* Открыть изображение */

  _openImageView() {
    popupImage.alt = this._name;
    popupNameImage.textContent = this._name;
    popupImage.src = this._link;

    openPopup(popupView);
  };

  /* Поставить лайк */

  _like() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  };

  /* Удалить карточку */

  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    const cardImage = this._element.querySelector('.card__image');

    cardImage.addEventListener('click', () => {
      this._openImageView();
    });
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._like();
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._deleteCard();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector('.card__image');

    cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    cardImage.src = this._link;

    return this._element;
  }
}
