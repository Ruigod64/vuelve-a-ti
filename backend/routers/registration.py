from fastapi import APIRouter, HTTPException

from models import RegistrationRequest, RegistrationResponse
from services.registration_service import RegistrationService
from repositories.json_repository import JsonRepository

router = APIRouter(prefix="/api", tags=["Registro"])

# Composición de dependencias (se podría inyectar con FastAPI Depends para mayor testabilidad)
_repository = JsonRepository()
_service = RegistrationService(_repository)


@router.post("/register", response_model=RegistrationResponse, summary="Registrar participante")
async def register(data: RegistrationRequest) -> RegistrationResponse:
    """
    Recibe nombre, correo y WhatsApp del participante,
    guarda el registro y devuelve la URL de WhatsApp prellenada.
    """
    try:
        return _service.register(data)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@router.get("/registros", summary="Listar registros (admin)")
async def list_registros() -> list[dict]:
    """Devuelve todos los registros guardados."""
    return _repository.get_all()
