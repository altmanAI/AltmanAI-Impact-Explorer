import React, { useEffect, useState } from "react";
import { ArtifactTable } from "./components/ArtifactTable";
import { ArtifactDetails } from "./components/ArtifactDetails";

export type Artifact = {
  registry_id: string;
  title: string;
  status: string;
  artifact_type: string;
  created_utc: string;
  minted_utc?: string | null;
  description?: string | null;
  owner?: string | null;
  tags?: string[] | null;
};

const API_BASE_URL = "http://127.0.0.1:8000";

export const App: React.FC = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [selected, setSelected] = useState<Artifact | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArtifacts = async () => {
      try {
        const resp = await fetch(`${API_BASE_URL}/artifacts`);
        if (!resp.ok) {
          throw new Error(`API error: ${resp.status}`);
        }
        const data: Artifact[] = await resp.json();
        setArtifacts(data);
        if (data.length > 0) {
          setSelected(data[0]);
        }
      } catch (err: any) {
        setError(err.message || "Unable to load artifacts.");
      } finally {
        setLoading(false);
      }
    };
    loadArtifacts();
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif", padding: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", marginBottom: "0.25rem" }}>AltmanAI Impact Explorer</h1>
        <p style={{ margin: 0, fontSize: "0.95rem" }}>
          Public-facing viewer for AINet and the PAIHI Registry, created by the team at AltmanAI by Altman Family Group, LLC.
        </p>
      </header>

      {loading && <p>Loading registry…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <main style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 3fr)", gap: "1.5rem" }}>
          <section>
            <h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Registry Index</h2>
            <ArtifactTable artifacts={artifacts} onSelect={setSelected} selectedId={selected?.registry_id ?? null} />
          </section>
          <section>
            <h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Artifact Details</h2>
            {selected ? (
              <ArtifactDetails artifact={selected} />
            ) : (
              <p>Select an artifact on the left to view details.</p>
            )}
          </section>
        </main>
      )}
    </div>
  );
};
