export class Card {
  constructor(data, templateId, userId, handleCardClick, { deleteCardClick, likeCardClick, likeCardRemove }) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._templateId = templateId;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._deleteCardClick = deleteCardClick;
    this._likeCardClick = likeCardClick;
    this._likeCardRemove = likeCardRemove;
  }

  _getTemplate() {
    const card = document.querySelector(this._templateId).
    content.querySelector('.card').cloneNode(true);

    return card;
  }

  /* Поставить лайк */

  addLike() {
    this._likeButton.classList.add('card__like_active');
  };

  /* Убрать лайк */

  removeLike() {
    this._likeButton.classList.remove('card__like_active');
  };

  /* Лайкнуть карточку */

  likeCard(data) {
    this._likeButton.classList.toggle('card__like_active');
    this._likes = data.likes;
    this._likeCounter.textContent = this._likes.length;
  };

  /* Лайкнул ли пользователь карточку? */

  _likesUser() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this.addLike();
    }
  }

  /* Удалить карточку */

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  /* Убираем кнопку удаления у чужих карточек */

  _removeDeleteButton() {
    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
    }
  }

  /* Навешиваем обработчики */

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('card__like_active')) {
        this._likeCardRemove(this._cardId);
      } else {
        this._likeCardClick(this._cardId);
      }
    });
    this._deleteButton.addEventListener('click', () => {
      this._deleteCardClick(this._cardId);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like');
    this._titleCard = this._element.querySelector('.card__title');
    this._cardImage = this._element.querySelector('.card__image');
    this._deleteButton = this._element.querySelector('.card__delete');
    this._likeCounter = this._element.querySelector('.card__number-like');


    this._likesUser();

    this._cardImage.alt = this._name;
    this._titleCard.textContent = this._name;
    this._cardImage.src = this._link;
    this._removeDeleteButton();
    this._likeCounter.textContent = this._likes.length;
    this._setEventListeners();

    return this._element;
  }

  getNameImage() {
    return this._name;
  }

  getLinkImage() {
    return this._link;
  }
}
