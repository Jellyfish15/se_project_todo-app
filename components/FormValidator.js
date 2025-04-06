class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._formSelector = settings.formSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  _showInputError(inputElement, errorMessage) {
    // Use the ID to find the error element
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    // Use the ID to find the error element
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }
  // TODO - implement all of the other methods

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  // Don't forget the helper method _hasInvalidInput
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  resetValidation() {
    // Get all input fields
    const inputList = this._formEl.querySelectorAll(this._inputSelector);

    // Clear all input values and hide their errors
    inputList.forEach((inputElement) => {
      // Clear the input value
      inputElement.value = "";
      // Hide any error messages
      this._hideInputError(inputElement);
    });

    // Disable submit button
    const buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement);
  }

  _setEventListeners() {
    // Get all input elements in the form
    const inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    // Initial button state
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        // Fix: Add 'this.' and use the correct method name with underscore
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
