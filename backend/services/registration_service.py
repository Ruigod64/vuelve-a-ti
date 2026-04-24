import os
from urllib.parse import quote

from models import RegistrationRequest, RegistrationResponse
from repositories.json_repository import IRepository


class RegistrationService:
    """
    Single Responsibility: orquesta el registro y genera la URL de WhatsApp.
    Dependency Inversion: depende de la abstracción IRepository, no de la implementación.
    """

    WHATSAPP_MESSAGE = (
        "Hola Angélica, acabo de registrarme al taller Vuelve a Ti y quiero recibir acceso."
    )

    def __init__(self, repository: IRepository) -> None:
        self._repository = repository
        # Leer número de variable de entorno para mayor seguridad/flexibilidad
        self._whatsapp_number = os.getenv("WHATSAPP_NUMBER", "521XXXXXXXXXX")

    def register(self, data: RegistrationRequest) -> RegistrationResponse:
        record = {
            "nombre": data.nombre,
            "correo": data.correo,
            "whatsapp": data.whatsapp,
        }
        saved = self._repository.save(record)
        whatsapp_url = self._build_whatsapp_url()

        return RegistrationResponse(
            success=saved,
            message="¡Registro exitoso! Te redirigimos a WhatsApp." if saved
                    else "Registro guardado. Por favor, comunícate por WhatsApp.",
            whatsapp_url=whatsapp_url,
        )

    def _build_whatsapp_url(self) -> str:
        encoded = quote(self.WHATSAPP_MESSAGE)
        return f"https://wa.me/{self._whatsapp_number}?text={encoded}"
