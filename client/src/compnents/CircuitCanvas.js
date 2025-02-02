import React from "react";
import styled from "styled-components";
import { useDrop } from "react-dnd";

const Canvas = styled.div`
  flex-grow: 1;
  background: #ffffff;
  border: 2px solid #ddd;
  height: 500px;
  position: relative;
`;

export function CircuitCanvas({ components, setComponents }) {
  const [, drop] = useDrop(() => ({
    accept: "GATE",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      setComponents((prev) => [...prev, { ...item, x: offset.x, y: offset.y }]);
    },
  }));

  return <Canvas ref={drop} />;
}
