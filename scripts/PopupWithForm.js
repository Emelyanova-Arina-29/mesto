import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const inputValuesList = {};
    this._inputs.forEach( (input) => {
      inputValuesList[input.name] = input.value;
    });

    return inputValuesList;
  }

  closePopup() {
    super.closePopup();
  }

  setInputValues(info) {
    this._inputs.forEach((input) => {
      input.value = info[input.name]
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.closePopup();
    });
  }
}
