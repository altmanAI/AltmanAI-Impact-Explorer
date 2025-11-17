from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
SAMPLE_DATA_DIR = BASE_DIR / "sample_data"
REGISTRY_INDEX_PATH = SAMPLE_DATA_DIR / "registry_index.json"


def get_registry_index_path() -> Path:
    return REGISTRY_INDEX_PATH
