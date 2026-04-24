from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime


class RegistrationRequest(BaseModel):
    nombre: str
    correo: EmailStr
    whatsapp: str

    @field_validator("nombre")
    @classmethod
    def nombre_no_vacio(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("El nombre no puede estar vacío")
        return v

    @field_validator("whatsapp")
    @classmethod
    def whatsapp_valido(cls, v: str) -> str:
        digits = "".join(filter(str.isdigit, v))
        if len(digits) < 10:
            raise ValueError("WhatsApp debe tener al menos 10 dígitos")
        return v.strip()


class RegistrationResponse(BaseModel):
    success: bool
    message: str
    whatsapp_url: str


class RegistrationRecord(BaseModel):
    nombre: str
    correo: str
    whatsapp: str
    created_at: datetime = None

    def model_post_init(self, __context) -> None:
        if self.created_at is None:
            self.created_at = datetime.now()
