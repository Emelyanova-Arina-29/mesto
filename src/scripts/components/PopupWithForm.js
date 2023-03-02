import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._buttonSubmit = this._form.querySelector('.popup__button');
    this._buttonSubmitText = this._buttonSubmit.textContent;
  }

  _getInputValues() {
    const inputValuesList = {};
    this._inputs.forEach( (input) => {
      inputValuesList[input.name] = input.value;
    });

    return inputValuesList;
  }

  setInputValues(info) {
    this._inputs.forEach((input) => {
      input.value = info[input.name]
    })
  }

  /* Кнопка во время загрузки */

  buttonStateLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = 'Сохранение...';
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this._form.reset();
      this.closePopup();
    });
  }
}
