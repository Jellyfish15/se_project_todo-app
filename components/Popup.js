

class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector); // Ensure this is set correctly
  }

  open() {
    this._popup.classList.add('popup_visible');
  }

  close() {
    this._popup.classList.remove('popup_visible');
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