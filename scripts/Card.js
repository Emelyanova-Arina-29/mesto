export class Card {
  constructor(data, templateId, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateId = templateId;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const card = document.querySelector(this._templateId).
    content.querySelector('.card').cloneNode(true);

    return card;
  }

  /* Поставить лайк */

  _like() {
    this._likeButton.classList.toggle('card__like_active');
  };

  /* Удалить карточку */

  _deleteCard() {
    this._element.remove();
  }

  /* Навешиваем обработчики */

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._likeButton.addEventListener('click', () => {
      this._like();
    });
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like');
    this._titleCard = this._element.querySelector('.card__title');
    this._cardImage = this._element.querySelector('.card__image');
    this._deleteButton = this._element.querySelector('.card__delete')

    this._setEventListeners();

    this._cardImage.alt = this._name;
    this._titleCard.textContent = this._name;
    this._cardImage.src = this._link;

    return this._element;
  }

  getNameImage() {
    return this._name;
  }

  getLinkImage() {
    return this._link;
  }
}
