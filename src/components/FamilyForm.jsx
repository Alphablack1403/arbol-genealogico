import React, { useState } from "react";

export default function FamilyForm({ nodes, agregarPersona }) {
  const [nombres, setNombres] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [padreId, setPadreId] = useState("");
  const [madreId, setMadreId] = useState("");

  const personas = nodes.filter((n) => !n.id.startsWith("pareja"));

  const submit = () => {
    agregarPersona({
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      padreId,
      madreId
    });

    setNombres("");
    setApellidoPaterno("");
    setApellidoMaterno("");
    setPadreId("");
    setMadreId("");
  };

  return (
  <div
    style={{
      width: "360px",
      padding: "12px",
      borderRight: "1px solid #333",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }}
  >
    <h3>Agregar familiar</h3>

    <input
      placeholder="Nombres"
      value={nombres}
      onChange={(e) => setNombres(e.target.value)}
    />

    <input
      placeholder="Apellido paterno"
      value={apellidoPaterno}
      onChange={(e) => setApellidoPaterno(e.target.value)}
    />

    <input
      placeholder="Apellido materno"
      value={apellidoMaterno}
      onChange={(e) => setApellidoMaterno(e.target.value)}
    />

    <select value={padreId} onChange={(e) => setPadreId(e.target.value)}>
      <option value="">Seleccionar padre</option>
      {personas.map((p) => (
        <option key={p.id} value={p.id}>
          {p.data.label}
        </option>
      ))}
    </select>

    <select value={madreId} onChange={(e) => setMadreId(e.target.value)}>
      <option value="">Seleccionar madre</option>
      {personas.map((p) => (
        <option key={p.id} value={p.id}>
          {p.data.label}
        </option>
      ))}
    </select>

    <button onClick={submit}>Agregar persona</button>

  </div>
);

}
