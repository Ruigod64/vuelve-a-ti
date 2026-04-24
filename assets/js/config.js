/**
 * config.js — Configuración centralizada del frontend.
 * Cambia API_BASE_URL al URL de tu servidor en producción.
 * Cambia WHATSAPP_NUMBER al número real de Angélica (con código de país, sin +).
 */
const CONFIG = Object.freeze({
  API_BASE_URL: "http://localhost:8000",   // ← Cambiar en producción
  WHATSAPP_NUMBER: "521XXXXXXXXXX",        // ← Número real de Angélica
  WHATSAPP_MESSAGE:
    "Hola Angélica, acabo de registrarme al taller Vuelve a Ti y quiero recibir acceso.",
  AUDIO_SRC: "./assets/cancion.mpeg",
});

export default CONFIG;
