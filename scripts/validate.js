/* Скрытие ошибки */

function hideInputError(formElement, inputElement,config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
}

/* Показ ошибки */

function showInputError(formElement, inputElement,config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
}

/* Проверка валидности полей ввода */

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement,config);
  } else {
    hideInputError(formElement, inputElement,config);
  }
}

/* Узнаем, есть ли невалидный инпут */

function hasInvalidInput(inputs) {
  return inputs.some((inputElement) =>
  !inputElement.validity.valid)
}

/* Переключение состояния кнопки */

function toggleButtonState(inputs, buttonElement, config) {
  if (hasInvalidInput(inputs)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

/* Установка слушателей */

function setEventListeners(formElement, config) {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputs, buttonElement, config);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputs, buttonElement, config);
    })
  })
}

/* Непосредственное подключение проверки полей */

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((formElement) => {
    setEventListeners(formElement, config);
  })
}
