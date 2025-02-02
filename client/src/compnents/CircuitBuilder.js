import React, { useState } from "react";
import styled from "styled-components";
import { GatePalette } from "./GatePalette";
import { CircuitCanvas } from "./CircuitCanvas";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

function CircuitBuilder() {
  const [components, setComponents] = useState([]);

  return (
    <Wrapper>
      <GatePalette setComponents={setComponents} />
      <CircuitCanvas components={components} setComponents={setComponents} />
    </Wrapper>
  );
}

export default CircuitBuilder;
