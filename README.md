# AltmanAI Impact Explorer

**AltmanAI-Impact-Explorer** is the public-facing window into the AltmanAI Impact Network (AINet) and the Proof-of-AI-Human-Impact (PAIHI) Registry.

AltmanAI by Altman Family Group builds human-first AI – useful assistants, open tools, and verifiable impact where humanity leads and intelligence follows. This repo turns that ethos into something you can browse, query, and verify.

## High-level architecture

This repo is a single fullstack app living at the root:

- **FastAPI backend (Python)**  
  - `main.py` – read-only API that exposes the AltmanAI Impact Explorer endpoints  
  - `models.py` – Pydantic models for artifacts and stats  
  - `config.py` – helpers for loading the registry index from `registry_index.json`  
  - `registry_index.json` – sample PAIHI-style entries that mirror how we actually mint artifacts at AltmanAI  
  - `test_health.py`, `test_artifacts.py` – basic API tests using `pytest`  

- **React + Vite frontend (TypeScript)**  
  - `index.html` – HTML shell  
  - `main.tsx` – React entrypoint  
  - `App.tsx` – layout + data loading from the API  
  - `ArtifactTable.tsx` – table view of all registry entries  
  - `ArtifactDetails.tsx` – detail view for a selected artifact  
  - `package.json`, `tsconfig.json`, `vite.config.ts`, `favicon.svg` – tooling and config  

This repository does not store sensitive information. It is a public viewer on top of already-public or intentionally-published artifacts.

## Quick start (dev)

### 1. Clone the repo

```bash
git clone https://github.com/altmanAI/AltmanAI-Impact-Explorer.git
cd AltmanAI-Impact-Explorer
