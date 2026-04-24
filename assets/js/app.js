/**
 * app.js — Punto de entrada y composición de módulos.
 * Dependency Inversion: instancia y conecta los módulos sin que se conozcan entre sí.
 */
import CONFIG from "./config.js";
import { AudioPlayer } from "./modules/AudioPlayer.js";
import { RegistrationForm } from "./modules/RegistrationForm.js";
import { ScrollAnimator } from "./modules/ScrollAnimator.js";
import { Lightbox } from "./modules/Lightbox.js";

function init() {
  // 1. Reproductor de audio
  const player = new AudioPlayer(CONFIG.AUDIO_SRC);
  player.mount("audio-player-container");

  // 2. Formulario de registro
  new RegistrationForm("registro-form", CONFIG);

  // 3. Lightbox para imágenes
  new Lightbox('.emotional__quote-img, .day-card__img, .about__img');

  // 4. Animaciones al hacer scroll
  const animator = new ScrollAnimator("[data-animate]", 0.12);
  animator.observe();

  // 5. Smooth scroll para CTAs internos
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute("href"));
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

document.addEventListener("DOMContentLoaded", init);
