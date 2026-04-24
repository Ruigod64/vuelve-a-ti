import sys
import os

# Añadir el directorio backend al path para imports absolutos
sys.path.insert(0, os.path.dirname(__file__))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.registration import router

app = FastAPI(
    title="Vuelve a Ti — API de Registro",
    description="Backend para el Taller Gratuito de Escritura Terapéutica",
    version="1.0.0",
)

# CORS: permite peticiones desde el frontend (ajusta origins en producción)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # En producción: ["https://angiemon.com"]
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/health", tags=["Sistema"])
def health_check() -> dict:
    """Verifica que el servidor esté en línea."""
    return {"status": "ok", "proyecto": "Vuelve a Ti"}
