import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export class RegistrationForm {
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

    const waInput = this._form.querySelector('[name="whatsapp"]');
    if (waInput) {
      waInput.addEventListener("input", () => {
        const pos = waInput.selectionStart;
        const clean = waInput.value.replace(/[^\d+\s\-()]/g, "");
        if (clean !== waInput.value) {
          waInput.value = clean;
          waInput.setSelectionRange(pos - 1, pos - 1);
        }
      });
      waInput.addEventListener("keydown", (e) => {
        const allowed = /[\d+\s\-()]/;
        const ctrl = e.ctrlKey || e.metaKey;
        if (!ctrl && e.key.length === 1 && !allowed.test(e.key)) e.preventDefault();
      });
    }
  }

  async _handleSubmit() {
    if (this._isSubmitting) return;
    const data = this._getFormData();
    const error = this._validate(data);
    if (error) { this._showError(error); return; }

    this._setLoading(true);

    try {
      const q = query(collection(db, "registros"), where("correo", "==", data.correo));
      const existing = await getDocs(q);
      if (!existing.empty) {
        this._showFeedback("Ya estás registrada. ¡Te esperamos el 20 de Mayo! 🌿", "success");
        setTimeout(() => this._redirectWhatsApp(data), 1800);
        return;
      }
      await addDoc(collection(db, "registros"), {
        ...data,
        fecha: serverTimestamp(),
      });
      this._showSuccess();
      setTimeout(() => this._redirectWhatsApp(data), 1800);
    } catch (err) {
      console.error("Error al guardar registro:", err);
      this._showError("Ocurrió un error. Intenta de nuevo.");
    } finally {
      this._setLoading(false);
    }
  }

  _getFormData() {
    return {
      nombre:   this._val("nombre"),
      correo:   this._val("correo"),
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

  _redirectWhatsApp(data) {
    const msg = encodeURIComponent(
      `Hola Angélica, acabo de registrarme al taller Vuelve a Ti y quiero recibir acceso.\n\nNombre: ${data.nombre}\nCorreo: ${data.correo}\nWhatsApp: ${data.whatsapp}`
    );
    window.open(`https://wa.me/${this._config.WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  }

  _setLoading(isLoading) {
    this._isSubmitting = isLoading;
    const btn = this._form.querySelector(".form-submit-btn");
    if (!btn) return;
    btn.disabled = isLoading;
    btn.textContent = isLoading ? "Enviando…" : "Quiero mi lugar";
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
