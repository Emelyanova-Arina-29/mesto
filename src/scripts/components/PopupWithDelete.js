import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._button = this._form.querySelectorAll('.popup__button');
    this._buttonSubmit = this._form.querySelector('.popup__button');
    this._buttonSubmitText = this._buttonSubmit.textContent;
  }

  /* Кнопка при загрузке */

  buttonStateLoadingDelete(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = 'Удаление...';
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }

  /* Вызов функции удаления */

  submitButton(deleteCard) {
    this._deleteCardClick = deleteCard
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._deleteCardClick();
      this.closePopup();
    });
  }
}
