import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor({ popupSelector , handleFormSubmit }) {
    super({ popupSelector }); 
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input')); // Fixed
  }
 
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners(); 
    this._form.addEventListener('submit', (evt) => {
  
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._form.reset(); // Reset the form after submission
    });
  }

  open() {
    super.open(); // Ensure the parent class's open method is called
  }
  
  close() {
    super.close();
  }
}

export default PopupWithForm;