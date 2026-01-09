import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState
} from "reactflow";
import "reactflow/dist/style.css";
import FamilyForm from "./components/FamilyForm";
import FamilyTree from "./components/FamilyTree";


export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Formulario
  const [nombres, setNombres] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [padreId, setPadreId] = useState("");
  const [madreId, setMadreId] = useState("");

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const crearNodoPareja = (padre, madre) => {
    const parejaId = `pareja-${padre}-${madre}`;
    if (nodes.find((n) => n.id === parejaId)) return parejaId;

    const parejaNode = {
      id: parejaId,
      data: { label: "" },
      position: { x: 300, y: 180 },
      style: { width: 10, height: 10, background: "#555", borderRadius: "50%" }
    };

    setNodes((nds) => [...nds, parejaNode]);
    setEdges((eds) => [
      ...eds,
      { id: `e-${padre}-${parejaId}`, source: padre, target: parejaId },
      { id: `e-${madre}-${parejaId}`, source: madre, target: parejaId }
    ]);

    return parejaId;
  };

const agregarPersona = ({
  nombres,
  apellidoPaterno,
  apellidoMaterno,
  padreId,
  madreId
}) => {
  if (!nombres) return;

  let apP = apellidoPaterno;
  let apM = apellidoMaterno;

  if (padreId && madreId && padreId === madreId) {
    alert("El padre y la madre no pueden ser la misma persona");
    return;
  }

  if (padreId) {
    const padre = nodes.find((n) => n.id === padreId);
    apP = padre?.data.apellidoPaterno || apP;
  }

  if (madreId) {
    const madre = nodes.find((n) => n.id === madreId);
    apM = madre?.data.apellidoPaterno || apM;
  }

  if (!apP && apM) apP = apM;
  if (!apM && apP) apM = apP;

  if (!apP && !apM) {
    alert("Debe existir al menos un apellido");
    return;
  }

  const idPersona = crypto.randomUUID();

  const personaNode = {
    id: idPersona,
    data: {
      label: `${nombres} ${apP} ${apM}`,
      nombres,
      apellidoPaterno: apP,
      apellidoMaterno: apM
    },
    position: {
      x: Math.random() * 400 + 100,
      y: Math.random() * 200 + 300
    }
  };

  setNodes((nds) => [...nds, personaNode]);

  if (padreId && madreId) {
  const parejaId = crearNodoPareja(padreId, madreId);

  setEdges((eds) => [
    ...eds,
    {
      id: `e-${parejaId}-${idPersona}`,
      source: parejaId,
      target: idPersona
    }
  ]);
}
};


  const personas = nodes.filter((n) => !n.id.startsWith("pareja"));

  return (
  <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
    <FamilyForm nodes={nodes} agregarPersona={agregarPersona} />
    <FamilyTree
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    />
  </div>
);

}