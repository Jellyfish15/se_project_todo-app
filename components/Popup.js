

class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector); // Ensure this is set correctly}
    this._handleEscKey = this._handleEscKey.bind(this); // Bind the method to the instance
  }

  _handleEscKey(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_visible');
    document.addEventListener("keydown", this._handleEscKey);
  }

  close() {
    this._popup.classList.remove('popup_visible');
    document.removeEventListener("keydown", this._handleEscKey);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (
        evt.target.classList.contains('popup_visible') ||
        evt.target.classList.contains('popup__close')
      ) {
        this.close();
      }
      
    });
  }
}

 export default Popup;