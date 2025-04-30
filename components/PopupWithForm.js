import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleFormSubmit ) {
    super({ popupSelector }); // Call the base Popup constructor
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input')); // Fixed
  }

  // 🔒 Private: Gather values from all inputs and return as an object
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  // 🔓 Public: Override parent's method to include form submission handling
  setEventListeners() {
    super.setEventListeners(); // Keep overlay and close button behavior
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // Optionally reset form when closed
  close() {
    super.close();
    this._form.reset();
  }
}


export default PopupWithForm;