import React from "react";
import type { Artifact } from "../App";

interface Props {
  artifacts: Artifact[];
  selectedId: string | null;
  onSelect: (artifact: Artifact) => void;
}

export const ArtifactTable: React.FC<Props> = ({ artifacts, selectedId, onSelect }) => {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: "0.5rem", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <thead style={{ background: "#f9fafb" }}>
          <tr>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>Registry ID</th>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>Title</th>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>Status</th>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>Type</th>
          </tr>
        </thead>
        <tbody>
          {artifacts.map((artifact) => {
            const isSelected = artifact.registry_id === selectedId;
            return (
              <tr
                key={artifact.registry_id}
                onClick={() => onSelect(artifact)}
                style={{
                  cursor: "pointer",
                  background: isSelected ? "#eef2ff" : "white"
                }}
              >
                <td style={{ padding: "0.5rem", borderTop: "1px solid #e5e7eb" }}>{artifact.registry_id}</td>
                <td style={{ padding: "0.5rem", borderTop: "1px solid #e5e7eb" }}>{artifact.title}</td>
                <td style={{ padding: "0.5rem", borderTop: "1px solid #e5e7eb" }}>{artifact.status}</td>
                <td style={{ padding: "0.5rem", borderTop: "1px solid #e5e7eb" }}>{artifact.artifact_type}</td>
              </tr>
            );
          })}
          {artifacts.length === 0 && (
            <tr>
              <td colSpan={4} style={{ padding: "0.75rem", textAlign: "center" }}>
                No artifacts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
