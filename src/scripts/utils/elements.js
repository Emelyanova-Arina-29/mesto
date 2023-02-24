const page = document.querySelector('.page');

const buttonOpenPopupCreateCard = page.querySelector('.profile__add');
const buttonOpenPopupEditProfile = page.querySelector('.profile__edit');

const formPopupEdit = document.forms.popupEdit;
const formpopupAdd = document.forms.popupAdd;

const popupView = page.querySelector('.popup_type_view');
const popupImage = popupView.querySelector('.popup__image');
const popupNameImage = popupView.querySelector('.popup__caption');
const inputNameProfile = formPopupEdit.querySelector('.popup__input_type_name');
const inputDescriptionProfile = formPopupEdit.querySelector('.popup__input_type_description')

export { buttonOpenPopupCreateCard,
  buttonOpenPopupEditProfile,
  formPopupEdit, formpopupAdd,
  popupImage, popupNameImage,
  inputNameProfile, inputDescriptionProfile }
