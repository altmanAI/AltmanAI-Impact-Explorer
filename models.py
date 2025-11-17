from pydantic import BaseModel
from typing import Optional, List


class Artifact(BaseModel):
    registry_id: str
    title: str
    status: str
    artifact_type: str
    created_utc: str
    minted_utc: Optional[str] = None
    description: Optional[str] = None
    owner: Optional[str] = None
    tags: Optional[List[str]] = None


class ArtifactStats(BaseModel):
    total: int
    by_status: dict
    by_type: dict
