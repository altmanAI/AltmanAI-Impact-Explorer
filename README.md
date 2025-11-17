# AltmanAI Impact Explorer

**AltmanAI-Impact-Explorer** is the public-facing window into the AltmanAI Impact Network (AINet) and the Proof-of-AI-Human-Impact (PAIHI) Registry.

AltmanAI by Altman Family Group builds human-first AI – useful assistants, open tools, and verifiable impact where humanity leads and intelligence follows. This repo turns that ethos into something you can browse, query, and verify.

## What this repo does

- Surfaces a **public index** of AltmanAI’s verifiable artifacts:
  - PAIHI-minted PDFs and JSON receipts
  - Master ledger entries
  - Governance docs (Charter, System Foundation, etc.)
- Exposes a small **read-only API** so other tools can plug into AINet.
- Renders a simple **web UI** so humans can explore:
  - Which artifacts exist
  - What they mean
  - When and how they were minted

Think of this as the **Impact Explorer for the AltmanAI universe**.

## High-level architecture

- `api/` – Python FastAPI service that:
  - Loads a registry index (from JSON, Git, or HTTP)
  - Normalizes entries into a shared schema
  - Exposes read-only endpoints like `/artifacts`, `/artifacts/{registry_id}`, `/stats`
- `web/` – Lightweight frontend (Next.js or similar) that:
  - Calls the API
  - Displays tables, filters, and detail views for each artifact
- `data/` – Public sample data:
  - Example PAIHI receipts
  - Example ledger index
  - Safe demo entries for development

This repo does **not** store sensitive information. It is a public viewer on top of already-public or intentionally-published artifacts.

## Quick start (dev)

### 1. Backend (API)

Requirements: Python 3.11+, `uvicorn`, `fastapi`

```bash
cd api
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install fastapi uvicorn pydantic[dotenv]
uvicorn main:app --reload
