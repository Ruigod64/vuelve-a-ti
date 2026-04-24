/**
 * AudioPlayer.js
 * Single Responsibility: gestiona el reproductor de audio.
 * Open/Closed: extiende comportamiento mediante callbacks sin modificar la clase.
 */
export class AudioPlayer {
  /** @param {string} src  URL del archivo de audio */
  constructor(src) {
    this._audio = new Audio(src);
    this._isPlaying = false;
    this._container = null;
    this._bindAudioEvents();
  }

  /**
   * Renderiza el reproductor dentro del elemento con el id dado.
   * @param {string} containerId
   */
  mount(containerId) {
    this._container = document.getElementById(containerId);
    if (!this._container) return;
    this._container.innerHTML = this._template();
    this._btn = this._container.querySelector(".ap-btn");
    this._progress = this._container.querySelector(".ap-progress-fill");
    this._timeEl = this._container.querySelector(".ap-time");
    this._titleEl = this._container.querySelector(".ap-title");
    this._btn.addEventListener("click", () => this.toggle());
  }

  toggle() {
    this._isPlaying ? this._pause() : this._play();
  }

  _play() {
    this._audio.play();
    this._isPlaying = true;
    this._btn?.classList.add("playing");
    this._btn?.setAttribute("aria-label", "Pausar canción");
  }

  _pause() {
    this._audio.pause();
    this._isPlaying = false;
    this._btn?.classList.remove("playing");
    this._btn?.setAttribute("aria-label", "Reproducir canción");
  }

  _bindAudioEvents() {
    this._audio.addEventListener("timeupdate", () => this._onTimeUpdate());
    this._audio.addEventListener("ended", () => {
      this._isPlaying = false;
      this._btn?.classList.remove("playing");
      if (this._progress) this._progress.style.width = "0%";
    });
  }

  _onTimeUpdate() {
    if (!this._audio.duration) return;
    const pct = (this._audio.currentTime / this._audio.duration) * 100;
    if (this._progress) this._progress.style.width = `${pct}%`;
    if (this._timeEl) {
      this._timeEl.textContent = this._formatTime(this._audio.currentTime);
    }
  }

  _formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  _template() {
    return `
      <div class="audio-player">
        <button class="ap-btn" aria-label="Reproducir canción" type="button">
          <span class="ap-icon-play"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg></span>
          <span class="ap-icon-pause"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg></span>
        </button>
        <div class="ap-info">
          <p class="ap-title">♪ Hoy Vuelvo a Mí — Angélica Montelongo</p>
          <div class="ap-track">
            <div class="ap-progress-bar">
              <div class="ap-progress-fill"></div>
            </div>
            <span class="ap-time">00:00</span>
          </div>
        </div>
      </div>`;
  }
}
