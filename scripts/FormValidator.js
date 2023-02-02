export class FormValidator {

  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  /* Скрытие ошибки */

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
    input.classList.remove(this._inputErrorClass);
  }

  /* Показ ошибки */

  _showInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  }

  /* Проверка валидности полей ввода */

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  /* Узнаем, есть ли невалидный инпут */

  _hasInvalidInput() {
    return this._inputs.some((input) =>
      !input.validity.valid)
  }

  /* Переключение состояния кнопки */

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  /* Установка слушателей */

  _setEventListeners() {
    this._toggleButtonState();
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      })
    })
  }

  /* Непосредственное подключение проверки полей */

  enableValidation() {
    this._setEventListeners();
  }

  /* Удаление сообщения валидации */

  removeValidation() {
    this._toggleButtonState();
    this._inputs.forEach((input) => {
      this._hideInputError(input);
    })
  }
}








// /* Скрытие ошибки */

// function hideInputError(formElement, inputElement, config) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   errorElement.classList.remove(config.errorClass);
//   errorElement.textContent = '';
//   inputElement.classList.remove(config.inputErrorClass);
// }

// /* Показ ошибки */

// function showInputError(formElement, inputElement,config) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   errorElement.classList.add(config.errorClass);
//   errorElement.textContent = inputElement.validationMessage;
//   inputElement.classList.add(config.inputErrorClass);
// }

// /* Проверка валидности полей ввода */

// function checkInputValidity(formElement, inputElement, config) {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement,config);
//   } else {
//     hideInputError(formElement, inputElement,config);
//   }
// }

// /* Узнаем, есть ли невалидный инпут */

// function hasInvalidInput(inputs) {
//   return inputs.some((inputElement) =>
//   !inputElement.validity.valid)
// }

// /* Переключение состояния кнопки */

// function toggleButtonState(inputs, buttonElement, config) {
//   if (hasInvalidInput(inputs)) {
//     buttonElement.classList.add(config.inactiveButtonClass);
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(config.inactiveButtonClass);
//     buttonElement.disabled = false;
//   }
// }

// /* Установка слушателей */

// function setEventListeners(formElement, config) {
//   const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
//   const buttonElement = formElement.querySelector(config.submitButtonSelector);
//   toggleButtonState(inputs, buttonElement, config);
//   inputs.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement, config);
//       toggleButtonState(inputs, buttonElement, config);
//     })
//   })
// }

// /* Непосредственное подключение проверки полей */

// export function enableValidation(config) {
//   const forms = Array.from(document.querySelectorAll(config.formSelector));
//   forms.forEach((formElement) => {
//     setEventListeners(formElement, config);
//   })
// }
