from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)


def test_list_artifacts():
    resp = client.get("/artifacts")
    assert resp.status_code == 200
    data = resp.json()
    assert isinstance(data, list)
    assert any(a["registry_id"] == "AFG-PAIHI-2025-11-03-ORIGIN-0001" for a in data)


def test_get_artifact():
    resp = client.get("/artifacts/AFG-PAIHI-2025-11-03-ORIGIN-0001")
    assert resp.status_code == 200
    art = resp.json()
    assert art["registry_id"] == "AFG-PAIHI-2025-11-03-ORIGIN-0001"


def test_get_artifact_not_found():
    resp = client.get("/artifacts/DOES-NOT-EXIST")
    assert resp.status_code == 404
