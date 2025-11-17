import React from "react";
import type { Artifact } from "../App";

interface Props {
  artifact: Artifact;
}

export const ArtifactDetails: React.FC<Props> = ({ artifact }) => {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: "0.5rem", padding: "0.75rem", fontSize: "0.9rem" }}>
      <div style={{ marginBottom: "0.5rem" }}>
        <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Registry ID</div>
        <div>{artifact.registry_id}</div>
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Title</div>
        <div>{artifact.title}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <div>
          <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Status</div>
          <div>{artifact.status}</div>
        </div>
        <div>
          <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Type</div>
          <div>{artifact.artifact_type}</div>
        </div>
        <div>
          <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Created (UTC)</div>
          <div>{artifact.created_utc}</div>
        </div>
        <div>
          <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Minted (UTC)</div>
          <div>{artifact.minted_utc || "—"}</div>
        </div>
      </div>
      {artifact.owner && (
        <div style={{ marginBottom: "0.5rem" }}>
          <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Owner</div>
          <div>{artifact.owner}</div>
        </div>
      )}
      {artifact.description && (
        <div style={{ marginBottom: "0.5rem" }}>
          <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Description</div>
          <div>{artifact.description}</div>
        </div>
      )}
      {artifact.tags && artifact.tags.length > 0 && (
        <div>
          <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Tags</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginTop: "0.25rem" }}>
            {artifact.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "999px",
                  padding: "0.15rem 0.5rem",
                  fontSize: "0.75rem"
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
