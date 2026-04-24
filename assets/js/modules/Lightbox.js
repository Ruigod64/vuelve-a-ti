export class Lightbox {
  constructor(triggerSelector) {
    this._lightbox = document.getElementById('lightbox');
    this._img      = document.getElementById('lightbox-img');
    this._close    = document.getElementById('lightbox-close');
    this._triggers = document.querySelectorAll(triggerSelector);
    if (this._lightbox) this._bindEvents();
  }

  _bindEvents() {
    this._triggers.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => this._open(img.src, img.alt));
    });

    this._close.addEventListener('click', () => this._closeBox());
    this._lightbox.addEventListener('click', (e) => {
      if (e.target === this._lightbox) this._closeBox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this._closeBox();
    });
  }

  _open(src, alt) {
    this._img.src = src;
    this._img.alt = alt;
    this._lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  _closeBox() {
    this._lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}
