import React from "react";
import styled from "styled-components";
import { FaAnd, FaOr, FaNot } from "react-icons/fa";
import { useDrag } from "react-dnd";

const Palette = styled.div`
  width: 200px;
  background: #f8f8f8;
  padding: 10px;
  border-right: 2px solid #ccc;
`;

const Gate = styled.div`
  padding: 10px;
  margin: 10px 0;
  background: white;
  border: 1px solid #ccc;
  cursor: grab;
  text-align: center;
`;

const gates = [
  { id: "and", name: "AND Gate", icon: <FaAnd /> },
  { id: "or", name: "OR Gate", icon: <FaOr /> },
  { id: "not", name: "NOT Gate", icon: <FaNot /> },
];

export function GatePalette() {
  return (
    <Palette>
      <h3>Logic Gates</h3>
      {gates.map((gate) => (
        <DraggableGate key={gate.id} gate={gate} />
      ))}
    </Palette>
  );
}

const DraggableGate = ({ gate }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "GATE",
    item: gate,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Gate ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {gate.icon} {gate.name}
    </Gate>
  );
};
