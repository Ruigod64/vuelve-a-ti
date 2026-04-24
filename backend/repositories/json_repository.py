import json
from pathlib import Path
from datetime import datetime
from typing import Protocol


class IRepository(Protocol):
    """Abstracción del repositorio — Dependency Inversion Principle."""

    def save(self, record: dict) -> bool: ...
    def get_all(self) -> list[dict]: ...


class JsonRepository:
    """
    Repositorio concreto que persiste registros en un archivo JSON.
    Single Responsibility: solo maneja lectura/escritura de JSON.
    """

    def __init__(self, filepath: str = "data/registrations.json") -> None:
        self._path = Path(filepath)
        self._path.parent.mkdir(parents=True, exist_ok=True)
        if not self._path.exists():
            self._path.write_text("[]", encoding="utf-8")

    def save(self, record: dict) -> bool:
        try:
            records = self._load()
            record["created_at"] = datetime.now().isoformat()
            records.append(record)
            self._path.write_text(
                json.dumps(records, indent=2, ensure_ascii=False), encoding="utf-8"
            )
            return True
        except Exception as exc:
            print(f"[JsonRepository] Error al guardar: {exc}")
            return False

    def get_all(self) -> list[dict]:
        return self._load()

    def _load(self) -> list[dict]:
        try:
            return json.loads(self._path.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, FileNotFoundError):
            return []
