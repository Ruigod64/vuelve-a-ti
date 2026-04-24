/**
 * RegistrationForm.js
 * Single Responsibility: gestiona validación, envío del formulario y redirección.
 * Dependency Inversion: recibe la config como parámetro (no la importa directamente).
 */
export class RegistrationForm {
  /**
   * @param {string} formId  ID del elemento <form>
   * @param {{ API_BASE_URL: string, WHATSAPP_NUMBER: string, WHATSAPP_MESSAGE: string }} config
   */
  constructor(formId, config) {
    this._form = document.getElementById(formId);
    this._config = config;
    this._isSubmitting = false;
    if (this._form) this._bindEvents();
  }

  _bindEvents() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit();
    });
  }

  async _handleSubmit() {
    if (this._isSubmitting) return;
    const data = this._getFormData();
    const error = this._validate(data);
    if (error) { this._showError(error); return; }

    this._setLoading(true);

    try {
      await this._postRegistration(data);
    } catch (_) {
      // Si el backend no está disponible, igual redirige a WhatsApp
    } finally {
      this._setLoading(false);
      this._showSuccess();
      setTimeout(() => this._redirectWhatsApp(data.nombre), 1800);
    }
  }

  _getFormData() {
    return {
      nombre: this._val("nombre"),
      correo: this._val("correo"),
      whatsapp: this._val("whatsapp"),
    };
  }

  _val(name) {
    return this._form.querySelector(`[name="${name}"]`)?.value.trim() ?? "";
  }

  _validate({ nombre, correo, whatsapp }) {
    if (!nombre) return "Por favor, escribe tu nombre.";
    if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo))
      return "Por favor, ingresa un correo válido.";
    if (!whatsapp || whatsapp.replace(/\D/g, "").length < 10)
      return "Por favor, ingresa un WhatsApp válido (mínimo 10 dígitos).";
    return null;
  }

  async _postRegistration(data) {
    const res = await fetch(`${this._config.API_BASE_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  _redirectWhatsApp(nombre) {
    const msg = encodeURIComponent(this._config.WHATSAPP_MESSAGE);
    window.open(`https://wa.me/${this._config.WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  }

  _setLoading(isLoading) {
    this._isSubmitting = isLoading;
    const btn = this._form.querySelector(".form-submit-btn");
    if (!btn) return;
    btn.disabled = isLoading;
    btn.textContent = isLoading ? "Enviando…" : "👉 Quiero mi lugar";
  }

  _showError(msg) {
    this._showFeedback(msg, "error");
  }

  _showSuccess() {
    this._showFeedback("✨ ¡Registro exitoso! Te llevamos a WhatsApp…", "success");
  }

  _showFeedback(msg, type) {
    let el = this._form.querySelector(".form-feedback");
    if (!el) {
      el = document.createElement("p");
      el.className = "form-feedback";
      this._form.appendChild(el);
    }
    el.textContent = msg;
    el.className = `form-feedback form-feedback--${type}`;
  }
}
