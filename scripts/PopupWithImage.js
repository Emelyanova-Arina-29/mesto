import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImage, popupNameImage) {
    super(popupSelector);
    this._popupImage = popupImage;
    this._popupNameImage = popupNameImage;
  }

  openPopup(name, link) {
    this._popupImage.alt = name;
    this._popupNameImage.textContent = name;
    this._popupImage.src = link;

    super.openPopup();
  }


}
