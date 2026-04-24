# Vuelve a Ti — Landing Page

Taller Gratuito de Escritura Terapéutica · Angélica Montelongo

---

## Estructura del proyecto

```
vuelve-a-ti/
├── index.html                       ← Landing page principal
├── assets/
│   ├── css/
│   │   ├── main.css                 ← Estilos generales
│   │   └── animations.css          ← Animaciones
│   ├── js/
│   │   ├── config.js               ← ⚠️ Configuración (editar antes de publicar)
│   │   ├── app.js                  ← Punto de entrada JS
│   │   └── modules/
│   │       ├── AudioPlayer.js      ← Reproductor de audio
│   │       ├── RegistrationForm.js ← Formulario y redirección WhatsApp
│   │       └── ScrollAnimator.js  ← Animaciones al hacer scroll
│   └── images/
│       ├── hero-banner.jpg
│       ├── grupo-taller.jpg
│       ├── dia1.jpg
│       ├── dia2.jpg
│       ├── dia3.jpg
│       └── dia4.jpg
└── backend/
    ├── main.py                      ← FastAPI entry point
    ├── models.py                    ← Pydantic schemas
    ├── routers/registration.py     ← Rutas de API
    ├── services/registration_service.py ← Lógica de negocio
    ├── repositories/json_repository.py ← Persistencia JSON
    └── requirements.txt
```

---

## ⚙️ Configuración obligatoria antes de publicar

### 1. Número de WhatsApp de Angélica

Edita `assets/js/config.js`:
```js
WHATSAPP_NUMBER: "521XXXXXXXXXX",   // ← Número real (sin + ni espacios)
```
Ejemplo: si el número es +52 (667) 123-4567 → `"526671234567"`

### 2. URL del backend en producción

```js
API_BASE_URL: "https://tu-servidor.com",  // ← URL real del backend
```

---

## 🖥️ Cómo correr el backend

```bash
cd backend
pip install -r requirements.txt

# Opcionalmente, crear .env con el número:
echo "WHATSAPP_NUMBER=521XXXXXXXXXX" > .env

uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Documentación automática disponible en: `http://localhost:8000/docs`

---

## 🌐 Cómo usar en Google Sites

1. Sube todos los archivos a un hosting (Netlify, GitHub Pages, etc.)
2. En Google Sites → Insertar → Incrustar → pega la URL del sitio
3. O bien: en Google Sites → Nueva página → Insertar HTML embebido

---

## 📋 Checklist antes de lanzar

- [ ] Reemplazar `WHATSAPP_NUMBER` en `config.js`
- [ ] Reemplazar `API_BASE_URL` en `config.js` con la URL del backend desplegado
- [ ] Añadir foto real de Angélica (actualmente usa `grupo-taller.jpg`)
- [ ] Verificar que `cancion.mpeg` esté en `assets/`
- [ ] Revisar y personalizar el texto del footer (redes sociales)
- [ ] Configurar CORS en `backend/main.py` con el dominio real de producción
