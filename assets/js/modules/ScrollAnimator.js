/**
 * ScrollAnimator.js
 * Single Responsibility: observa elementos y aplica animaciones al hacer scroll.
 * Open/Closed: las clases CSS definen la animación, no este módulo.
 */
export class ScrollAnimator {
  /**
   * @param {string} selector  Selector CSS de elementos a animar
   * @param {number} threshold Porcentaje visible antes de activar (0–1)
   */
  constructor(selector = "[data-animate]", threshold = 0.15) {
    this._selector = selector;
    this._observer = new IntersectionObserver(
      (entries) => this._onIntersect(entries),
      { threshold }
    );
  }

  /** Observa todos los elementos que coincidan con el selector. */
  observe() {
    document.querySelectorAll(this._selector).forEach((el) => {
      el.classList.add("animate-hidden");
      this._observer.observe(el);
    });
  }

  _onIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-visible");
        entry.target.classList.remove("animate-hidden");
        this._observer.unobserve(entry.target); // animar solo una vez
      }
    });
  }
}
