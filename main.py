from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import json

from .models import Artifact, ArtifactStats
from .config import get_registry_index_path


app = FastAPI(
    title="AltmanAI Impact Explorer API",
    description="Read-only API for browsing AltmanAI PAIHI registry entries and impact artifacts.",
    version="0.1.0",
)


# Allow local dev frontends and simple deployments to talk to the API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _load_registry_index() -> list[Artifact]:
    path = get_registry_index_path()
    if not path.exists():
        return []
    raw = json.loads(path.read_text())
    return [Artifact(**item) for item in raw]


@app.get("/health")
def health() -> dict:
    """Simple health check used by monitoring and local dev."""
    return {
        "status": "ok",
        "service": "altmanai-impact-explorer-api",
    }


@app.get("/artifacts", response_model=List[Artifact])
def list_artifacts(status: Optional[str] = None, artifact_type: Optional[str] = None) -> List[Artifact]:
    """Return all artifacts, optionally filtered by status or type."""
    artifacts = _load_registry_index()
    if status:
        artifacts = [a for a in artifacts if a.status.lower() == status.lower()]
    if artifact_type:
        artifacts = [a for a in artifacts if a.artifact_type.lower() == artifact_type.lower()]
    return artifacts


@app.get("/artifacts/{registry_id}", response_model=Artifact)
def get_artifact(registry_id: str) -> Artifact:
    """Return a single artifact by Registry ID."""
    artifacts = _load_registry_index()
    for art in artifacts:
        if art.registry_id == registry_id:
            return art
    raise HTTPException(status_code=404, detail="Artifact not found")


@app.get("/stats", response_model=ArtifactStats)
def get_stats() -> ArtifactStats:
    """Return simple aggregate stats about the registry."""
    artifacts = _load_registry_index()
    by_status: dict[str, int] = {}
    by_type: dict[str, int] = {}

    for art in artifacts:
        by_status[art.status] = by_status.get(art.status, 0) + 1
        by_type[art.artifact_type] = by_type.get(art.artifact_type, 0) + 1

    return ArtifactStats(
        total=len(artifacts),
        by_status=by_status,
        by_type=by_type,
    )
